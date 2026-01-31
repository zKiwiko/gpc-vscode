import {
  CompletionItem,
  CompletionItemKind,
  Position,
} from "vscode-languageserver";
import { Parser } from "./parser/parser";
import { Snippets } from "./snippets";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

interface IncludeCompletionContext {
  inInclude: boolean;
  prefix: string;
  quoteChar: '"' | "'" | "<";
}

export class Completions {
  /**
   * Check if cursor is in an #include directive context
   */
  private static getIncludeContext(
    originalText: string,
    position: Position,
  ): IncludeCompletionContext | null {
    const lines = originalText.split("\n");
    const line = lines[position.line];
    if (!line) {
      return null;
    }

    // Get text up to cursor position
    const lineUpToCursor = line.substring(0, position.character);

    // Match #include with open quote/bracket but not closed
    // Handles: #include "..., #include '..., #include <...
    const includeMatch = lineUpToCursor.match(
      /^(\s*)#include\s+(["'<])([^"'>]*)$/,
    );
    if (includeMatch) {
      return {
        inInclude: true,
        prefix: includeMatch[3],
        quoteChar: includeMatch[2] as '"' | "'" | "<",
      };
    }
    return null;
  }

  /**
   * Get .gpc files from directory recursively
   */
  private static async getGpcFilesInDirectory(
    baseDir: string,
    currentFile: string,
    relativePath: string = "",
  ): Promise<string[]> {
    const files: string[] = [];
    const searchDir = relativePath ? path.join(baseDir, relativePath) : baseDir;

    try {
      const entries = await fs.promises.readdir(searchDir, {
        withFileTypes: true,
      });
      for (const entry of entries) {
        const entryRelativePath = relativePath
          ? path.join(relativePath, entry.name)
          : entry.name;
        const fullPath = path.join(baseDir, entryRelativePath);

        if (entry.isFile() && entry.name.endsWith(".gpc")) {
          if (fullPath !== currentFile) {
            files.push(entryRelativePath);
          }
        } else if (entry.isDirectory() && !entry.name.startsWith(".")) {
          // Recursively search subdirectories
          const subFiles = await this.getGpcFilesInDirectory(
            baseDir,
            currentFile,
            entryRelativePath,
          );
          files.push(...subFiles);
        }
      }
    } catch {
      // Directory not accessible, ignore
    }
    return files;
  }

  /**
   * Get completion items for include file paths
   */
  private static async getIncludeCompletions(
    uri: string,
    prefix: string,
  ): Promise<CompletionItem[]> {
    const filePath = fileURLToPath(uri);
    const baseDir = path.dirname(filePath);
    const files = await this.getGpcFilesInDirectory(baseDir, filePath);

    // Filter by prefix (case-insensitive)
    const filteredFiles = files.filter((f) =>
      f.toLowerCase().startsWith(prefix.toLowerCase()),
    );

    return filteredFiles.map((file) => ({
      label: file,
      kind: CompletionItemKind.File,
      detail: "GPC include file",
      insertText: file,
      sortText: file.includes(path.sep) ? `1${file}` : `0${file}`, // Prioritize same-directory files
    }));
  }

  public static async getCompletionItems(
    input: string,
    originalText?: string,
    position?: Position,
    uri?: string,
  ): Promise<CompletionItem[]> {
    // Check for include context if position info is available
    if (originalText && position && uri) {
      const includeCtx = this.getIncludeContext(originalText, position);
      if (includeCtx && includeCtx.inInclude) {
        return this.getIncludeCompletions(uri, includeCtx.prefix);
      }
    }
    const visitor = Parser.getVisitor(input);
    const items: CompletionItem[] = [];

    const keywords: string[] = [
      "if",
      "else",
      "while",
      "for",
      "function",
      "return",
      "break",
      "continue",
      "switch",
      "case",
      "default",
      "do",
      "combo",
      "init",
      "main",
      "enum",
      "define",
      "const",
      "TRUE",
      "FALSE",
      "use",
    ];

    const datatypes: string[] = [
      "int",
      "int8",
      "int16",
      "int32",
      "uint8",
      "uint16",
      "uint32",
      "string",
      "data",
      "image",
      "ps5adt",
    ];

    // Add keywords as completion items
    for (const keyword of keywords) {
      items.push({
        label: keyword,
        kind: CompletionItemKind.Keyword,
        detail: `Keyword: ${keyword}`,
        documentation: `GPC keyword: ${keyword}`,
      });
    }

    // Add data types as completion items
    for (const datatype of datatypes) {
      items.push({
        label: datatype,
        kind: CompletionItemKind.TypeParameter,
        detail: `Data Type: ${datatype}`,
        documentation: `GPC data type: ${datatype}`,
      });
    }

    // Add variables as completion items
    for (const variable of visitor.Variables.values()) {
      items.push({
        label: variable.name,
        kind: variable.const
          ? CompletionItemKind.Constant
          : CompletionItemKind.Variable,
        detail: variable.const ? "Constant" : "Variable",
        documentation: `User-defined ${
          variable.const ? "constant" : "variable"
        }: ${variable.name}`,
      });
    }

    // Add constants as completion items
    for (const constant of visitor.Constants.values()) {
      items.push({
        label: constant.name,
        kind: CompletionItemKind.Constant,
        detail: "Built-in Constant",
        documentation: `Built-in constant: ${constant.name}`,
      });
    }

    // Add user-defined functions as completion items
    for (const func of visitor.Functions.values()) {
      const paramSnippet =
        func.parameters && func.parameters.length > 0
          ? func.parameters
              .map((param, index) => `\${${index + 1}:${param}}`)
              .join(", ")
          : "";

      items.push({
        label: func.name,
        kind: CompletionItemKind.Function,
        detail: `Function(${func.parameters?.join(", ") || ""})`,
        documentation: `User-defined function: ${func.name}`,
        insertText: `${func.name}(${paramSnippet})`, // Snippet with parameter placeholders
        insertTextFormat: 2, // Snippet format
      });
    }

    // Add built-in functions as completion items
    for (const func of visitor.CFunctions.values()) {
      const paramSnippet =
        func.parameters && func.parameters.length > 0
          ? func.parameters
              .map((param, index) => `\${${index + 1}:${param}}`)
              .join(", ")
          : "";

      items.push({
        label: func.name,
        kind: CompletionItemKind.Function,
        detail: `Built-in Function(${func.parameters?.join(", ") || ""})`,
        documentation: func.description || `Built-in function: ${func.name}`,
        insertText: `${func.name}(${paramSnippet})`, // Snippet with parameter placeholders
        insertTextFormat: 2, // Snippet format
      });
    }

    for (const combo of visitor.Combos.values()) {
      items.push({
        label: combo.name,
        kind: CompletionItemKind.Enum,
        detail: `Combo: ${combo.name}`,
        documentation: `User-defined combo: ${combo.name}`,
      });
    }

    for (const snip of Snippets.getSnippets()) {
      items.push(snip);
    }

    return items;
  }
}
