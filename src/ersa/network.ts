import { promises as fs } from "fs";
import * as path from "path";

export class Network {
  private static getPlatformBinaryName(baseName: string): string {
    return process.platform === "win32" ? `${baseName}.exe` : baseName;
  }

  public static get_ersa_user_dir(): string {
    if (process.platform === "win32") {
      return path.join(process.env.APPDATA || "", "ersa");
    } else {
      return path.join(process.env.HOME || "", ".local", "share", "ersa");
    }
  }

  public static async get_repoinfo(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "gpc-vscode",
      },
    });
    return response.json();
  }

  public static async get_latest_version(url: string): Promise<string> {
    const repoinfo = await this.get_repoinfo(url);
    return repoinfo.tag_name;
  }

  public static async download_latest_release(url: string): Promise<void> {
    const repoinfo = await this.get_repoinfo(url);
    const platform = this.getPlatformBinaryName("ersa");
    const asset = repoinfo.assets.find((a: any) => a.name === platform);

    if (!asset) {
      throw new Error(`Binary for platform not found: ${platform}`);
    }

    const response = await fetch(asset.browser_download_url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const binaryPath = path.join(this.get_ersa_user_dir(), platform);

    await fs.mkdir(this.get_ersa_user_dir(), { recursive: true });
    await fs.writeFile(binaryPath, buffer);

    if (process.platform !== "win32") {
      await fs.chmod(binaryPath, 0o755);
    }
  }
}
