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

import { Completions } from "./completion";
import { ErrorCollector } from "./errors";
import { LanguageFeatures } from "./features";
import { Parser } from "./parser/parser";

import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CodeAction,
  CodeActionParams,
  CompletionItem,
  createConnection,
  DefinitionParams,
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

class Server {
  private connection = createConnection(ProposedFeatures.all);
  private documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );
  private hasConfigurationCapability = false;

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
      });

      this.documents.onDidChangeContent((change) => {
        const text = change.document.getText();
        try {
          // Clear cache when document changes
          Parser.clearCache();

          // Collect errors from the document text by parsing.
          const errors = ErrorCollector.collectErrors(text);
          this.connection.sendDiagnostics({
            uri: change.document.uri,
            diagnostics: errors,
          });
        } catch (error) {
          this.connection.console.error(
            `Error processing document ${change.document.uri}: ${error}`
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

          const text = document.getText();
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
          // For now, just return the item as-is since we're providing all details upfront
          // You can add more detailed documentation or additional processing here if needed
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
    } catch (error) {
      console.error("Error setting up language server handlers:", error);
    }
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
