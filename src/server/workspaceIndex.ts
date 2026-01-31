import * as fs from "fs";
import * as path from "path";
import { Parser } from "./parser/parser";

export interface WorkspaceSymbol {
  name: string;
  type: "variable" | "function" | "combo" | "constant";
  filePath: string;
}

/**
 * Index of all symbols in the workspace for quick lookup
 */
export class WorkspaceIndex {
  private symbolIndex: Map<string, WorkspaceSymbol[]> = new Map();
  private indexedFiles: Set<string> = new Set();
  private workspaceRoot: string | null = null;

  /**
   * Set the workspace root directory
   */
  public setWorkspaceRoot(root: string): void {
    this.workspaceRoot = root;
  }

  /**
   * Index all .gpc files in a directory recursively
   */
  public async indexDirectory(dirPath: string): Promise<void> {
    try {
      const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isFile() && entry.name.endsWith(".gpc")) {
          await this.indexFile(fullPath);
        } else if (entry.isDirectory() && !entry.name.startsWith(".")) {
          await this.indexDirectory(fullPath);
        }
      }
    } catch {
      // Directory not accessible, ignore
    }
  }

  /**
   * Index symbols from a single file
   */
  public async indexFile(filePath: string): Promise<void> {
    // Remove old entries for this file if it was already indexed
    if (this.indexedFiles.has(filePath)) {
      this.removeFileFromIndex(filePath);
    }

    try {
      const content = await fs.promises.readFile(filePath, "utf-8");
      const visitor = Parser.getVisitor(content);

      // Index variables
      for (const variable of visitor.Variables.values()) {
        this.addSymbol(variable.name, variable.const ? "constant" : "variable", filePath);
      }

      // Index functions
      for (const func of visitor.Functions.values()) {
        this.addSymbol(func.name, "function", filePath);
      }

      // Index combos
      for (const combo of visitor.Combos.values()) {
        this.addSymbol(combo.name, "combo", filePath);
      }

      this.indexedFiles.add(filePath);
    } catch {
      // File not readable, ignore
    }
  }

  /**
   * Remove a file from the index
   */
  private removeFileFromIndex(filePath: string): void {
    for (const [name, symbols] of this.symbolIndex.entries()) {
      const filtered = symbols.filter((s) => s.filePath !== filePath);
      if (filtered.length === 0) {
        this.symbolIndex.delete(name);
      } else {
        this.symbolIndex.set(name, filtered);
      }
    }
    this.indexedFiles.delete(filePath);
  }

  /**
   * Add a symbol to the index
   */
  private addSymbol(name: string, type: WorkspaceSymbol["type"], filePath: string): void {
    if (!this.symbolIndex.has(name)) {
      this.symbolIndex.set(name, []);
    }
    this.symbolIndex.get(name)!.push({ name, type, filePath });
  }

  /**
   * Find files that contain a symbol
   */
  public findSymbol(name: string): WorkspaceSymbol[] {
    return this.symbolIndex.get(name) || [];
  }

  /**
   * Get relative path from workspace root
   */
  public getRelativePath(filePath: string, fromFile: string): string {
    // Calculate relative path from the file's directory
    const fromDir = path.dirname(fromFile);
    return path.relative(fromDir, filePath);
  }

  /**
   * Clear the entire index
   */
  public clear(): void {
    this.symbolIndex.clear();
    this.indexedFiles.clear();
  }

  /**
   * Check if a file is indexed
   */
  public isIndexed(filePath: string): boolean {
    return this.indexedFiles.has(filePath);
  }

  /**
   * Get all indexed files
   */
  public getIndexedFiles(): string[] {
    return Array.from(this.indexedFiles);
  }
}
