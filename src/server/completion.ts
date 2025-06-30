import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { Parser } from "./parser/parser";

export class Completions {
  public static getCompletionItems(input: string): CompletionItem[] {
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

    return items;
  }
}
