/*
 * GPC Language Support for VS Code
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

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Server Started: gpc-vscode");

  const openDocsCommand = vscode.commands.registerCommand(
    "gpc.openDocumentation",
    async () => {
      const options = [
        {
          label: "GPC Language Reference",
          description: "Complete language documentation",
          url: "https://guide.cronus.support/gpc",
        },
        {
          label: "User Defined Function Reference",
          description: "GPC scripting functions and their usage",
          url: "https://guide.cronus.support/gpc/gpc-scripting-user-created-functions",
        },
        {
          label: "User Defined Variable Reference",
          description: "Creating, using, and managing variables",
          url: "https://guide.cronus.support/gpc/gpc-scripting-variables",
        },
        {
          label: "Language Constants",
          description: "Built-in constants available in GPC scripts",
          url: "https://guide.cronus.support/gpc/gpc-scripting-constants",
        },
        {
          label: "Language Functions",
          description: "Built-in functions available in GPC scripts",
          url: "https://guide.cronus.support/gpc/gpc-scripting-functions",
        },
      ];

      const selected = await vscode.window.showQuickPick(options, {
        placeHolder: "Select documentation to open",
      });

      if (selected) {
        vscode.env.openExternal(vscode.Uri.parse(selected.url));
      }
    }
  );

  context.subscriptions.push(openDocsCommand);

  const ServerOptions: ServerOptions = {
    run: {
      module: context.asAbsolutePath("dist/server.js"),
      transport: TransportKind.ipc,
    },
    debug: {
      module: context.asAbsolutePath("dist/server.js"),
      transport: TransportKind.ipc,
    },
  };

  const clientOptions: LanguageClientOptions = {
    // Register the server for gpc documents
    documentSelector: [{ scheme: "file", language: "gpc" }],
    synchronize: {
      // Notify the server about file changes to '.gpc' files contain in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.gpc"),
      // Also sync configuration changes
      configurationSection: "gpc",
    },
  };

  client = new LanguageClient(
    "gpc-vscode",
    "GPC Language Server",
    ServerOptions,
    clientOptions
  );

  client
    .start()
    .then(() => {
      console.log("GPC Language Server started successfully.");
    })
    .catch((error: any) => {
      console.error("Failed to start GPC Language Server:", error);
      vscode.window.showErrorMessage(
        `Failed to start GPC Language Server: ${error.message || error}`
      );
    });
}

// This method is called when your extension is deactivated
export function deactivate() {
  if (!client) {
    return undefined;
  }

  // Check if client is running before trying to stop it
  if (client.state === 2) {
    // State.Running
    return client.stop().catch((error: any) => {
      console.error("Error stopping language client:", error);
    });
  } else {
    console.log("Language client is not running, no need to stop");
    return Promise.resolve();
  }
}
