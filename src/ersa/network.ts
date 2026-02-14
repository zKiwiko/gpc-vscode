const fs = require("fs").promises;

export class Network {
  public static get_ersa_user_dir(): string {
    if (process.platform === "win32") {
      return `${process.env.APPDATA}\\ersa`;
    } else {
      return `${process.env.HOME}/.local/share/ersa`;
    }
  }

  public static async get_repoinfo(url: string): Promise<any> {
    const user_agent = "gpc-vscode/1.0";
    const response = await fetch(url, {
      headers: {
        "User-Agent": user_agent,
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
    const platform = process.platform === "win32" ? "ersa.exe" : "ersa";
    const asset = repoinfo.assets.find((a: any) => a.name === platform);

    if (!asset) {
      throw new Error(`Binary for platform not found: ${platform}`);
    }

    const response = await fetch(asset.browser_download_url);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const path = `${this.get_ersa_user_dir()}/${platform}`;

    await fs.mkdir(this.get_ersa_user_dir(), { recursive: true });
    await fs.writeFile(path, buffer);

    if (process.platform !== "win32") {
      await fs.chmod(path, 0o755);
    }
  }
}
