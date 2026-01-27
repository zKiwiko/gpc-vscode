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
import { WorkspaceIndex } from "./workspaceIndex";
import { SemanticTokensProvider, TOKEN_TYPES, TOKEN_MODIFIERS } from "./semanticTokens";

import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeAction,
  CodeActionParams,
  CompletionItem,
  createConnection,
  DefinitionParams,
  Diagnostic,
  DiagnosticSeverity,
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
  /** Workspace symbol index for quick fixes */
  private workspaceIndex: WorkspaceIndex = new WorkspaceIndex();
  /** Workspace root path */
  private workspaceRoot: string | null = null;
  /** Debounce timers for document validation */
  private validationTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  /** Debounce delay in milliseconds */
  private readonly VALIDATION_DELAY = 300;

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

          // Capture workspace root for indexing
          if (params.workspaceFolders && params.workspaceFolders.length > 0) {
            this.workspaceRoot = fileURLToPath(params.workspaceFolders[0].uri);
            this.workspaceIndex.setWorkspaceRoot(this.workspaceRoot);
            // Index workspace in background (don't block initialization)
            this.workspaceIndex.indexDirectory(this.workspaceRoot).catch((err) => {
              console.error("Error indexing workspace:", err);
            });
          } else if (params.rootUri) {
            this.workspaceRoot = fileURLToPath(params.rootUri);
            this.workspaceIndex.setWorkspaceRoot(this.workspaceRoot);
            this.workspaceIndex.indexDirectory(this.workspaceRoot).catch((err) => {
              console.error("Error indexing workspace:", err);
            });
          }

          return {
            capabilities: {
              textDocumentSync: TextDocumentSyncKind.Incremental,
              completionProvider: {
                resolveProvider: false,
                triggerCharacters: [
                  ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_".split(""),
                  '"', "'", '<', '/', // For #include path completion
                ],
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
              semanticTokensProvider: {
                full: true,
                legend: {
                  tokenTypes: [...TOKEN_TYPES],
                  tokenModifiers: [...TOKEN_MODIFIERS],
                },
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
        // Cancel any pending validation timer
        const timer = this.validationTimers.get(change.document.uri);
        if (timer) {
          clearTimeout(timer);
          this.validationTimers.delete(change.document.uri);
        }
      });

      this.documents.onDidChangeContent((change) => {
        const uri = change.document.uri;

        // Cancel any pending validation for this document
        const existingTimer = this.validationTimers.get(uri);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        // Debounce validation to avoid reprocessing on every keystroke
        const timer = setTimeout(async () => {
          this.validationTimers.delete(uri);
          const document = this.documents.get(uri);
          if (!document) {
            return;
          }

          const text = document.getText();

          // Validate the changed document
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
        }, this.VALIDATION_DELAY);

        this.validationTimers.set(uri, timer);
      });

      // Handle completion requests
      this.connection.onCompletion(
        async (
          textDocumentPosition: TextDocumentPositionParams
        ): Promise<CompletionItem[]> => {
          const document = this.documents.get(
            textDocumentPosition.textDocument.uri
          );
          if (!document) {
            return [];
          }

          // Use preprocessed content to include symbols from included files
          const cached = this.preprocessCache.get(textDocumentPosition.textDocument.uri);
          const text = cached ? cached.processedText : document.getText();
          const originalText = document.getText();

          try {
            return await Completions.getCompletionItems(
              text,
              originalText,
              textDocumentPosition.position,
              textDocumentPosition.textDocument.uri
            );
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
        const cached = this.preprocessCache.get(params.textDocument.uri);

        try {
          // Use include-aware references if preprocess cache is available
          if (cached) {
            const context: IncludeContext = {
              originalText: text,
              processedText: cached.processedText,
              sourceMap: cached.result.sourceMap,
              mainUri: params.textDocument.uri,
            };
            return LanguageFeatures.getReferencesWithIncludes(
              context,
              params.position,
              params.context.includeDeclaration
            );
          }

          // Fallback to single-file references
          const locations = LanguageFeatures.getReferences(
            text,
            params.position,
            params.context.includeDeclaration
          );
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
        const cached = this.preprocessCache.get(params.textDocument.uri);

        try {
          // Pass include context if available for better suggestions
          const includeContext = cached
            ? {
                originalText: text,
                processedText: cached.processedText,
                sourceMap: cached.result.sourceMap,
                mainUri: params.textDocument.uri,
              }
            : undefined;

          return LanguageFeatures.getCodeActions(
            text,
            params.range,
            params.context.diagnostics,
            includeContext,
            this.workspaceIndex
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

      // Handle semantic tokens requests
      this.connection.languages.semanticTokens.on((params) => {
        const document = this.documents.get(params.textDocument.uri);
        if (!document) {
          return { data: [] };
        }

        const text = document.getText();
        const cached = this.preprocessCache.get(params.textDocument.uri);

        try {
          if (cached) {
            const context: IncludeContext = {
              originalText: text,
              processedText: cached.processedText,
              sourceMap: cached.result.sourceMap,
              mainUri: params.textDocument.uri,
            };
            return SemanticTokensProvider.getSemanticTokens(context);
          }

          // Fallback without include context
          const context: IncludeContext = {
            originalText: text,
            processedText: text,
            sourceMap: [],
            mainUri: params.textDocument.uri,
          };
          return SemanticTokensProvider.getSemanticTokens(context);
        } catch (error) {
          this.connection.console.error(
            `Error providing semantic tokens: ${error}`
          );
          return { data: [] };
        }
      });
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
            message: `[${includedFileName}](${fileUri}) ${mapped!.diagnostic.message}`,
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

      // Check for unused includes
      const unusedIncludeWarnings = await this.detectUnusedIncludes(
        text,
        preprocessResult,
        filePath
      );

      this.connection.sendDiagnostics({
        uri: uri,
        diagnostics: [...mainFilePreprocessErrors, ...mainFileErrors, ...includedFileErrors, ...unusedIncludeWarnings],
      });
    } catch (error) {
      this.connection.console.error(`Error validating document ${uri}: ${error}`);
    }
  }

  /**
   * Detect includes that have no symbols used from them
   */
  private async detectUnusedIncludes(
    originalText: string,
    preprocessResult: PreprocessResult,
    mainFilePath: string
  ): Promise<Diagnostic[]> {
    const warnings: Diagnostic[] = [];

    // Strip comments from preprocessed content before parsing
    // (ANTLR lexer may not properly skip comments)
    const strippedMainContent = preprocessResult.content
      .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove block comments
      .replace(/\/\/.*$/gm, '');          // Remove line comments

    // Get the visitor for the combined preprocessed content
    const mainVisitor = Parser.getVisitor(strippedMainContent);

    // For each included file, check if any of its symbols are used
    for (const includedFile of preprocessResult.includedFiles) {
      try {
        // Read and parse the included file to get its symbols
        const fs = await import("fs");
        const includedContent = await fs.promises.readFile(includedFile, "utf-8");
        // Strip #include directives and comments before parsing
        const strippedContent = includedContent
          // Remove block comments
          .replace(/\/\*[\s\S]*?\*\//g, '')
          // Remove line comments
          .replace(/\/\/.*$/gm, '')
          // Remove #include directives
          .split("\n")
          .map(line => line.trimStart().startsWith("#") ? "" : line)
          .join("\n");
        const includedVisitor = Parser.getVisitor(strippedContent);

        // Check if any symbol from the included file is used in the main content
        let hasUsedSymbol = false;

        // Check functions
        for (const funcName of includedVisitor.Functions.keys()) {
          const mainFunc = mainVisitor.Functions.get(funcName);
          if (mainFunc && mainFunc.used) {
            hasUsedSymbol = true;
            break;
          }
        }

        // Check variables
        if (!hasUsedSymbol) {
          for (const varName of includedVisitor.Variables.keys()) {
            const mainVar = mainVisitor.Variables.get(varName);
            if (mainVar && mainVar.used) {
              hasUsedSymbol = true;
              break;
            }
          }
        }

        // Check combos
        if (!hasUsedSymbol) {
          for (const comboName of includedVisitor.Combos.keys()) {
            const mainCombo = mainVisitor.Combos.get(comboName);
            if (mainCombo && mainCombo.used) {
              hasUsedSymbol = true;
              break;
            }
          }
        }

        // If no symbols are used, find the #include line and add warning
        if (!hasUsedSymbol) {
          const includedFileName = path.basename(includedFile);
          const lines = originalText.split("\n");

          // Find the #include line for this file
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes("#include") && line.includes(includedFileName)) {
              warnings.push({
                severity: DiagnosticSeverity.Hint,
                range: {
                  start: { line: i, character: 0 },
                  end: { line: i, character: line.length },
                },
                message: `Included file '${includedFileName}' has no symbols used`,
                source: "GPC Analyzer",
              });
              break;
            }
          }
        }
      } catch {
        // Couldn't read or parse included file, skip
      }
    }

    return warnings;
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
