/*
 * GPC Language Support for VS Code - Language Server
 * Copyright (C) 2025 zkiwiko
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as path from "path";
import { fileURLToPath } from "url";
import { Completions } from "./completion";
import { ErrorCollector } from "./errors";
import { IncludeContext, LanguageFeatures } from "./features";
import { Parser } from "./parser/parser";
import { Preprocessor, PreprocessResult, SourceMapping } from "./preprocessor";

import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeAction,
  CodeActionParams,
  CompletionItem,
  createConnection,
  DefinitionParams,
  DocumentLink,
  DocumentLinkParams,
  DocumentSymbol,
  DocumentSymbolParams,
  Hover,
  InitializeParams,
  InitializeResult,
  InlayHint,
  InlayHintParams,
  Location,
  ProposedFeatures,
  ReferenceParams,
  SignatureHelp,
  SignatureHelpParams,
  TextDocumentPositionParams,
  TextDocuments,
  TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { pathToFileURL } from "url";

/** Cached preprocess result for a document */
interface DocumentPreprocessInfo {
  result: PreprocessResult;
  processedText: string;
}

class Server {
  private connection = createConnection(ProposedFeatures.all);
  private documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );
  private hasConfigurationCapability = false;
  /** Cache of preprocess results by document URI */
  private preprocessCache: Map<string, DocumentPreprocessInfo> = new Map();

  constructor() {
    try {
      console.log("Starting GPC Language Server...");

      this.documents.listen(this.connection);
      this.connection.onInitialize(
        (params: InitializeParams): InitializeResult => {
          console.log("GPC Language Server initialized");

          // Check if the client supports configuration
          this.hasConfigurationCapability = !!(
            params.capabilities.workspace &&
            params.capabilities.workspace.configuration
          );

          return {
            capabilities: {
              textDocumentSync: TextDocumentSyncKind.Incremental,
              completionProvider: {
                resolveProvider: false,
                triggerCharacters:
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_".split(
                    ""
                  ),
              },
              hoverProvider: true,
              definitionProvider: true,
              referencesProvider: true,
              documentSymbolProvider: true,
              signatureHelpProvider: {
                triggerCharacters: ["(", ","],
              },
              codeActionProvider: true,
              inlayHintProvider: true,
              documentLinkProvider: {
                resolveProvider: false,
              },
            },
          };
        }
      );

      this.setupHandlers();
      this.connection.listen();
    } catch (error) {
      console.error("Error starting GPC Language Server:", error);
    }
  }

  private setupHandlers(): void {
    try {
      this.documents.onDidOpen((change) => {
        // reset diagnostics when a document is opened
        this.connection.sendDiagnostics({
          uri: change.document.uri,
          diagnostics: [],
        });
      });

      this.documents.onDidClose((change) => {
        // reset diagnostics when a document is closed
        this.connection.sendDiagnostics({
          uri: change.document.uri,
          diagnostics: [],
        });
        // Clean up preprocess cache
        this.preprocessCache.delete(change.document.uri);
      });

      this.documents.onDidChangeContent(async (change) => {
        const text = change.document.getText();
        const uri = change.document.uri;

        // Validate the changed document (async to avoid blocking LSP thread)
        await this.validateAndSendDiagnostics(uri, text);

        // If this file is included by other open documents, re-validate them
        try {
          const filePath = fileURLToPath(uri);
          const currentFileName = path.basename(filePath);
          for (const doc of this.documents.all()) {
            if (doc.uri === uri) {
              continue; // Skip self
            }

            const cached = this.preprocessCache.get(doc.uri);
            if (cached) {
              // Check if any source mapping references this file
              const includesThisFile = cached.result.sourceMap.some(
                m => m.originalFile === filePath ||
                     path.basename(m.originalFile) === currentFileName
              );
              if (includesThisFile) {
                await this.revalidateDocument(doc);
              }
            }
          }
        } catch (error) {
          this.connection.console.error(
            `Error checking dependent documents for ${uri}: ${error}`
          );
        }
      });

      // Handle completion requests
      this.connection.onCompletion(
        (
          textDocumentPosition: TextDocumentPositionParams
        ): CompletionItem[] => {
          const document = this.documents.get(
            textDocumentPosition.textDocument.uri
          );
          if (!document) {
            return [];
          }

          // Use preprocessed content to include symbols from included files
          const cached = this.preprocessCache.get(textDocumentPosition.textDocument.uri);
          const text = cached ? cached.processedText : document.getText();

          try {
            return Completions.getCompletionItems(text);
          } catch (error) {
            this.connection.console.error(
              `Error providing completions: ${error}`
            );
            return [];
          }
        }
      );

      // Handle completion resolve requests
      this.connection.onCompletionResolve(
        (item: CompletionItem): CompletionItem => {
          // for satisfying the LSP protocol, dont need
          // it since we provide all details upfront
          return item;
        }
      );

      // Handle hover requests
      this.connection.onHover(
        (params: TextDocumentPositionParams): Hover | null => {
          const document = this.documents.get(params.textDocument.uri);
          if (!document) {
            return null;
          }

          const cached = this.preprocessCache.get(params.textDocument.uri);
          if (cached) {
            // Use include-aware hover
            const context: IncludeContext = {
              originalText: document.getText(),
              processedText: cached.processedText,
              sourceMap: cached.result.sourceMap,
              mainUri: params.textDocument.uri,
            };
            try {
              return LanguageFeatures.getHoverInfoWithIncludes(context, params.position);
            } catch (error) {
              this.connection.console.error(`Error providing hover info: ${error}`);
              return null;
            }
          }

          // Fallback to original behavior
          const text = document.getText();
          try {
            return LanguageFeatures.getHoverInfo(text, params.position);
          } catch (error) {
            this.connection.console.error(
              `Error providing hover info: ${error}`
            );
            return null;
          }
        }
      );

      // Handle definition requests
      this.connection.onDefinition((params: DefinitionParams): Location[] => {
        const document = this.documents.get(params.textDocument.uri);
        if (!document) {
          return [];
        }

        const cached = this.preprocessCache.get(params.textDocument.uri);
        if (cached) {
          // Use include-aware definition
          const context: IncludeContext = {
            originalText: document.getText(),
            processedText: cached.processedText,
            sourceMap: cached.result.sourceMap,
            mainUri: params.textDocument.uri,
          };
          try {
            return LanguageFeatures.getDefinitionWithIncludes(context, params.position);
          } catch (error) {
            this.connection.console.error(`Error providing definition: ${error}`);
            return [];
          }
        }

        // Fallback to original behavior
        const text = document.getText();
        try {
          const locations = LanguageFeatures.getDefinition(
            text,
            params.position
          );
          // Set the correct URI for each location
          return locations.map((loc) => ({
            ...loc,
            uri: params.textDocument.uri,
          }));
        } catch (error) {
          this.connection.console.error(`Error providing definition: ${error}`);
          return [];
        }
      });

      // Handle references requests
      this.connection.onReferences((params: ReferenceParams): Location[] => {
        const document = this.documents.get(params.textDocument.uri);
        if (!document) {
          return [];
        }

        const text = document.getText();
        try {
          const locations = LanguageFeatures.getReferences(
            text,
            params.position,
            params.context.includeDeclaration
          );
          // Set the correct URI for each location
          return locations.map((loc) => ({
            ...loc,
            uri: params.textDocument.uri,
          }));
        } catch (error) {
          this.connection.console.error(`Error providing references: ${error}`);
          return [];
        }
      });

      // Handle document symbol requests
      this.connection.onDocumentSymbol(
        (params: DocumentSymbolParams): DocumentSymbol[] => {
          const document = this.documents.get(params.textDocument.uri);
          if (!document) {
            return [];
          }

          const text = document.getText();
          try {
            return LanguageFeatures.getDocumentSymbols(text);
          } catch (error) {
            this.connection.console.error(
              `Error providing document symbols: ${error}`
            );
            return [];
          }
        }
      );

      // Handle signature help requests
      this.connection.onSignatureHelp(
        (params: SignatureHelpParams): SignatureHelp | null => {
          const document = this.documents.get(params.textDocument.uri);
          if (!document) {
            return null;
          }

          const cached = this.preprocessCache.get(params.textDocument.uri);
          if (cached) {
            // Use include-aware signature help
            const context: IncludeContext = {
              originalText: document.getText(),
              processedText: cached.processedText,
              sourceMap: cached.result.sourceMap,
              mainUri: params.textDocument.uri,
            };
            try {
              return LanguageFeatures.getSignatureHelpWithIncludes(context, params.position);
            } catch (error) {
              this.connection.console.error(`Error providing signature help: ${error}`);
              return null;
            }
          }

          // Fallback to original behavior
          const text = document.getText();
          try {
            return LanguageFeatures.getSignatureHelp(text, params.position);
          } catch (error) {
            this.connection.console.error(
              `Error providing signature help: ${error}`
            );
            return null;
          }
        }
      );

      // Handle code action requests
      this.connection.onCodeAction((params: CodeActionParams): CodeAction[] => {
        const document = this.documents.get(params.textDocument.uri);
        if (!document) {
          return [];
        }

        const text = document.getText();
        try {
          return LanguageFeatures.getCodeActions(
            text,
            params.range,
            params.context.diagnostics
          );
        } catch (error) {
          this.connection.console.error(
            `Error providing code actions: ${error}`
          );
          return [];
        }
      });

      // Handle inlay hints requests
      this.connection.onRequest(
        "textDocument/inlayHint",
        async (params: InlayHintParams): Promise<InlayHint[]> => {
          const document = this.documents.get(params.textDocument.uri);
          if (!document) {
            return [];
          }

          // Check configuration
          const config = await this.getConfiguration(params.textDocument.uri);
          if (!config.inlayHintsEnabled) {
            return []; // Return empty array if inlay hints are disabled
          }

          const text = document.getText();
          try {
            return LanguageFeatures.getInlayHints(text, params.range, config);
          } catch (error) {
            this.connection.console.error(
              `Error providing inlay hints: ${error}`
            );
            return [];
          }
        }
      );

      // Handle document link requests (Ctrl+click on #include)
      this.connection.onDocumentLinks(
        (params: DocumentLinkParams): DocumentLink[] => {
          const document = this.documents.get(params.textDocument.uri);
          if (!document) {
            return [];
          }

          const text = document.getText();
          const links: DocumentLink[] = [];
          const lines = text.split("\n");

          // Regex to match #include directives
          const includeRegex = /^(\s*)#include\s+(?:["']([^"']+)["']|<([^>]+)>)/;

          try {
            const filePath = fileURLToPath(params.textDocument.uri);
            const baseDir = path.dirname(filePath);

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              const match = line.match(includeRegex);

              if (match) {
                const includePath = match[2] || match[3];
                const resolvedPath = path.resolve(baseDir, includePath);

                // Find the position of the path in the line
                const pathStart = line.indexOf(includePath);
                const pathEnd = pathStart + includePath.length;

                links.push({
                  range: {
                    start: { line: i, character: pathStart },
                    end: { line: i, character: pathEnd },
                  },
                  target: pathToFileURL(resolvedPath).toString(),
                  tooltip: `Open ${includePath}`,
                });
              }
            }
          } catch (error) {
            this.connection.console.error(
              `Error providing document links: ${error}`
            );
          }

          return links;
        }
      );
    } catch (error) {
      console.error("Error setting up language server handlers:", error);
    }
  }

  /**
   * Validate a document and send diagnostics
   * Shared logic for both document changes and revalidation
   */
  private async validateAndSendDiagnostics(uri: string, text: string): Promise<void> {
    try {
      Parser.clearCache();
      const filePath = fileURLToPath(uri);
      const baseDir = path.dirname(filePath);
      const preprocessResult = await Preprocessor.process(text, baseDir, filePath);

      this.preprocessCache.set(uri, {
        result: preprocessResult,
        processedText: preprocessResult.content,
      });

      const parseErrors = ErrorCollector.collectErrors(preprocessResult.content);
      const mappedResults = parseErrors
        .map((error) => Preprocessor.mapDiagnostic(error, preprocessResult.sourceMap, filePath))
        .filter((mapped) => mapped !== null);

      const mainFileErrors: typeof parseErrors = [];
      const includedFileErrors: typeof parseErrors = [];

      for (const mapped of mappedResults) {
        if (mapped!.file === filePath) {
          mainFileErrors.push(mapped!.diagnostic);
        } else {
          const includedFilePath = mapped!.file;
          const includedFileName = path.basename(includedFilePath);
          const fileUri = `file://${includedFilePath}`;
          const errorWithContext = {
            ...mapped!.diagnostic,
            message: `[${fileUri}](${fileUri}) ${mapped!.diagnostic.message}`,
          };
          // Map the error to the include line for THIS specific file
          const processedLines = preprocessResult.content.split('\n');
          const includeLineMapping = preprocessResult.sourceMap.find(
            m => m.originalFile === filePath &&
                 processedLines[m.processedLine]?.includes(`[begin include: ${includedFileName}]`)
          );
          if (includeLineMapping) {
            errorWithContext.range = {
              start: { line: includeLineMapping.originalLine, character: 0 },
              end: { line: includeLineMapping.originalLine, character: 100 },
            };
          }
          includedFileErrors.push(errorWithContext);
        }
      }

      const mainFilePreprocessErrors = preprocessResult.errors.filter(
        (e) => !e.message.includes("in included file")
      );

      this.connection.sendDiagnostics({
        uri: uri,
        diagnostics: [...mainFilePreprocessErrors, ...mainFileErrors, ...includedFileErrors],
      });
    } catch (error) {
      this.connection.console.error(`Error validating document ${uri}: ${error}`);
    }
  }

  /**
   * Re-validate a document (used when an included file changes)
   */
  private async revalidateDocument(document: TextDocument): Promise<void> {
    await this.validateAndSendDiagnostics(document.uri, document.getText());
  }

  private async getConfiguration(uri?: string): Promise<{
    inlayHintsEnabled: boolean;
    parameterNamesEnabled: boolean;
  }> {
    if (!this.hasConfigurationCapability) {
      // Default settings if configuration is not supported
      return {
        inlayHintsEnabled: true,
        parameterNamesEnabled: true,
      };
    }

    try {
      const config = await this.connection.workspace.getConfiguration([
        {
          scopeUri: uri,
          section: "gpc.inlayHints.enabled",
        },
        {
          scopeUri: uri,
          section: "gpc.inlayHints.parameterNames",
        },
      ]);

      return {
        inlayHintsEnabled: config[0] !== false, // Default to true if undefined
        parameterNamesEnabled: config[1] !== false, // Default to true if undefined
      };
    } catch (error) {
      // Return defaults if configuration fails
      return {
        inlayHintsEnabled: true,
        parameterNamesEnabled: true,
      };
    }
  }
}

// Create and start the server instance only if running as a language server
if (
  process.argv.includes("--node-ipc") ||
  process.argv.includes("--stdio") ||
  process.argv.some((arg) => arg.startsWith("--socket="))
) {
  const server = new Server();
}
