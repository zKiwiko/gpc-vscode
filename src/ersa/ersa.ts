import * as vscode from "vscode";
import { Network } from "./network";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class Ersa {
  private static readonly ERSA_REPO_URL =
    "https://api.github.com/repos/zkiwiko/ersa/releases/latest";
  private static readonly ERSA_LSP_REPO_URL =
    "https://api.github.com/repos/zkiwiko/ersa-lsp-core/releases/latest";

  private static getPlatformBinaryName(baseName: string): string {
    return process.platform === "win32" ? `${baseName}.exe` : baseName;
  }

  public static is_installed(): boolean {
    // First check custom path from configuration if it's set
    const config = vscode.workspace.getConfiguration("gpc");
    const customPath = config.get<string>("ersa.binaryPath") || "";

    if (customPath && fs.existsSync(customPath)) {
      return true;
    }

    // Then check the expected directory
    const platform = this.getPlatformBinaryName("ersa");
    const binaryPath = path.join(Network.get_ersa_user_dir(), platform);

    if (fs.existsSync(binaryPath)) {
      return true;
    }

    return false;
  }

  private static get_binary_path(): string {
    const config = vscode.workspace.getConfiguration("gpc");
    const customPath = config.get<string>("ersa.binaryPath") || "";

    if (customPath && fs.existsSync(customPath)) {
      return customPath;
    }

    const platform = this.getPlatformBinaryName("ersa");
    return path.join(Network.get_ersa_user_dir(), platform);
  }

  public static get_lsp_binary_path(): string {
    const config = vscode.workspace.getConfiguration("gpc");

    // First check custom LSP binary path from configuration if it's set
    const customLspPath = config.get<string>("lsp.binaryPath") || "";
    if (customLspPath && fs.existsSync(customLspPath)) {
      return customLspPath;
    }

    // Then check if custom Ersa path is set, assume LSP is in the same directory
    const customErsaPath = config.get<string>("ersa.binaryPath") || "";
    if (customErsaPath && fs.existsSync(customErsaPath)) {
      const dir = path.dirname(customErsaPath);
      const platform = this.getPlatformBinaryName("ersa_lsp");
      return path.join(dir, platform);
    }

    // Finally, check the expected directory
    const platform = this.getPlatformBinaryName("ersa_lsp");
    return path.join(Network.get_ersa_user_dir(), platform);
  }

  private static is_using_custom_path(): boolean {
    const config = vscode.workspace.getConfiguration("gpc");
    const customPath = config.get<string>("ersa.binaryPath") || "";
    return customPath !== "" && fs.existsSync(customPath);
  }

  private static is_using_custom_lsp_path(): boolean {
    const config = vscode.workspace.getConfiguration("gpc");
    const customLspPath = config.get<string>("lsp.binaryPath") || "";
    const customErsaPath = config.get<string>("ersa.binaryPath") || "";

    // Using custom LSP path if either lsp.binaryPath is set, or ersa.binaryPath is set
    return (
      (customLspPath !== "" && fs.existsSync(customLspPath)) ||
      (customErsaPath !== "" && fs.existsSync(customErsaPath))
    );
  }

  private static async get_installed_version(): Promise<string | null> {
    try {
      const binaryPath = this.get_binary_path();
      const { stdout } = await execAsync(`"${binaryPath}" --version`);
      const match = stdout.trim().match(/(\d+\.\d+\.\d+)/);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  }

  public static is_lsp_installed(): boolean {
    const lspPath = this.get_lsp_binary_path();
    return fs.existsSync(lspPath);
  }

  private static async get_lsp_installed_version(): Promise<string | null> {
    try {
      const lspPath = this.get_lsp_binary_path();
      const { stdout } = await execAsync(`"${lspPath}" --version`);
      const match = stdout.trim().match(/(\d+\.\d+\.\d+)/);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  }

  private static async install_lsp(): Promise<void> {
    const binaryPath = this.get_binary_path();
    await execAsync(`"${binaryPath}" lsp --install`);
  }

  private static async update_lsp(): Promise<void> {
    const binaryPath = this.get_binary_path();
    await execAsync(`"${binaryPath}" lsp --update`);
  }

  private static compare_versions(v1: string, v2: string): number {
    // Returns: -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
    const parts1 = v1.replace(/^v/, "").split(".").map(Number);
    const parts2 = v2.replace(/^v/, "").split(".").map(Number);

    for (let i = 0; i < 3; i++) {
      if (parts1[i] > parts2[i]) {
        return 1;
      }
      if (parts1[i] < parts2[i]) {
        return -1;
      }
    }
    return 0;
  }

  public static async init(): Promise<void> {
    if (!this.is_installed()) {
      const response = await vscode.window.showWarningMessage(
        "Ersa is not installed. Would you like to install it now?",
        "Install",
        "Cancel",
      );

      if (response === "Install") {
        try {
          await vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              title: "Installing Ersa",
              cancellable: false,
            },
            async (progress) => {
              progress.report({ message: "Downloading latest release..." });
              await Network.download_latest_release(this.ERSA_REPO_URL);
              progress.report({ message: "Installation complete!" });
            },
          );

          vscode.window.showInformationMessage("Ersa installed successfully!");
        } catch (error) {
          vscode.window.showErrorMessage(
            `Failed to install Ersa: ${error instanceof Error ? error.message : String(error)}`,
          );
          throw error;
        }
      } else {
        throw new Error("Ersa installation cancelled by user");
      }
    } else {
      // Check for updates
      try {
        const [installedVersion, latestVersion] = await Promise.all([
          this.get_installed_version(),
          Network.get_latest_version(this.ERSA_REPO_URL),
        ]);

        if (!installedVersion) {
          console.warn("Could not determine installed Ersa version");
          return;
        }

        const cleanLatestVersion = latestVersion.replace(/^v/, "");

        if (this.compare_versions(installedVersion, cleanLatestVersion) < 0) {
          // Update available
          if (this.is_using_custom_path()) {
            // Notify user about update for custom binary
            const response = await vscode.window.showInformationMessage(
              `Ersa update available: ${installedVersion} → ${cleanLatestVersion}. You are using a custom binary path.`,
              "Download Page",
            );

            if (response === "Download Page") {
              vscode.env.openExternal(
                vscode.Uri.parse(
                  "https://github.com/zkiwiko/ersa/releases/latest",
                ),
              );
            }
          } else {
            // Auto-update for managed installation
            const response = await vscode.window.showInformationMessage(
              `Ersa update available: ${installedVersion} → ${cleanLatestVersion}`,
              "Update",
              "Skip",
            );

            if (response === "Update") {
              await vscode.window.withProgress(
                {
                  location: vscode.ProgressLocation.Notification,
                  title: "Updating Ersa",
                  cancellable: false,
                },
                async (progress) => {
                  progress.report({ message: "Downloading latest release..." });
                  await Network.download_latest_release(this.ERSA_REPO_URL);
                  progress.report({ message: "Update complete!" });
                },
              );

              vscode.window.showInformationMessage(
                `Ersa updated to ${cleanLatestVersion}!`,
              );
            }
          }
        }
      } catch (error) {
        // Silently fail version check - don't block initialization
        console.error("Failed to check for Ersa updates:", error);
      }
    }

    // After Ersa is installed/updated, check for LSP
    await this.init_lsp();
  }

  private static async init_lsp(): Promise<void> {
    if (!this.is_lsp_installed()) {
      // LSP not installed, install it
      try {
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Installing Ersa LSP",
            cancellable: false,
          },
          async (progress) => {
            progress.report({ message: "Downloading LSP binary..." });
            await this.install_lsp();
            progress.report({ message: "Installation complete!" });
          },
        );

        vscode.window.showInformationMessage(
          "Ersa LSP installed successfully!",
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to install Ersa LSP: ${error instanceof Error ? error.message : String(error)}`,
        );
        throw error;
      }
    } else {
      // LSP is installed, check for updates
      try {
        const [installedVersion, latestVersion] = await Promise.all([
          this.get_lsp_installed_version(),
          Network.get_latest_version(this.ERSA_LSP_REPO_URL),
        ]);

        if (!installedVersion) {
          console.warn("Could not determine installed Ersa LSP version");
          return;
        }

        const cleanLatestVersion = latestVersion.replace(/^v/, "");

        if (this.compare_versions(installedVersion, cleanLatestVersion) < 0) {
          // Update available
          if (this.is_using_custom_lsp_path()) {
            // Notify user about update for custom binary
            const response = await vscode.window.showInformationMessage(
              `Ersa LSP update available: ${installedVersion} → ${cleanLatestVersion}. You are using a custom binary path.`,
              "Download Page",
            );

            if (response === "Download Page") {
              vscode.env.openExternal(
                vscode.Uri.parse(
                  "https://github.com/zkiwiko/ersa-lsp-core/releases/latest",
                ),
              );
            }
          } else {
            // Auto-update for managed installation
            const response = await vscode.window.showInformationMessage(
              `Ersa LSP update available: ${installedVersion} → ${cleanLatestVersion}`,
              "Update",
              "Skip",
            );

            if (response === "Update") {
              await vscode.window.withProgress(
                {
                  location: vscode.ProgressLocation.Notification,
                  title: "Updating Ersa LSP",
                  cancellable: false,
                },
                async (progress) => {
                  progress.report({ message: "Downloading latest release..." });
                  await this.update_lsp();
                  progress.report({ message: "Update complete!" });
                },
              );

              vscode.window.showInformationMessage(
                `Ersa LSP updated to ${cleanLatestVersion}!`,
              );
            }
          }
        }
      } catch (error) {
        // Silently fail version check - don't block initialization
        console.error("Failed to check for Ersa LSP updates:", error);
      }
    }
  }
}
