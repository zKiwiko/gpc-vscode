import { CompletionItem, CompletionItemKind } from "vscode-languageserver";

export class Snippets {
  public static getSnippets(): CompletionItem[] {
    const snippets: CompletionItem[] = [];

    snippets.push({
      label: "for~",
      kind: CompletionItemKind.Snippet,
      detail: "For loop snippet",
      documentation: "Creates a for loop structure",
      insertText: "for (${1:i} = 0; $1 < ${2:count}; $1++) {\n\t$0\n}",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "if-else~",
      kind: CompletionItemKind.Snippet,
      detail: "If-else snippet",
      documentation: "Creates an if-else structure",
      insertText: "if (${1:condition}) {\n\t$0\n} else {\n\t\n}",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "function~",
      kind: CompletionItemKind.Snippet,
      detail: "Function definition snippet",
      documentation: "Creates a function definition",
      insertText: "function ${1:name}(${2:params}) {\n\t$0\n}",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "while~",
      kind: CompletionItemKind.Snippet,
      detail: "While loop snippet",
      documentation: "Creates a while loop structure",
      insertText: "while (${1:condition}) {\n\t$0\n}",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "do-while~",
      kind: CompletionItemKind.Snippet,
      detail: "Do-while loop snippet",
      documentation: "Creates a do-while loop structure",
      insertText: "do {\n\t$0\n} while (${1:condition});",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "switch~",
      kind: CompletionItemKind.Snippet,
      detail: "Switch statement snippet",
      documentation: "Creates a switch statement structure",
      insertText:
        "switch (${1:expression}) {\n\tcase ${2:value}: {\n\t\t$0\n\t\tbreak; }\n\tdefault {\n\t\t\n}",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "int8~",
      kind: CompletionItemKind.Snippet,
      detail: "8-bit integer array declaration",
      documentation: "Declares an 8-bit integer array",
      insertText: "const int8 ${1:name}[] = { $2 };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "int16~",
      kind: CompletionItemKind.Snippet,
      detail: "16-bit integer array declaration",
      documentation: "Declares a 16-bit integer array",
      insertText: "const int16 ${1:name}[] = { $2 };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "uint8~",
      kind: CompletionItemKind.Snippet,
      detail: "8-bit unsigned integer array declaration",
      documentation: "Declares an 8-bit unsigned integer array",
      insertText: "const uint8 ${1:name}[] = { $2 };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "uint16~",
      kind: CompletionItemKind.Snippet,
      detail: "16-bit unsigned integer array declaration",
      documentation: "Declares a 16-bit unsigned integer array",
      insertText: "const uint16 ${1:name}[] = { $2 };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "string~",
      kind: CompletionItemKind.Snippet,
      detail: "String array declaration",
      documentation: "Declares a string array",
      insertText: "const string ${1:name}[] = { $2 };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "int8~~",
      kind: CompletionItemKind.Snippet,
      detail: "8-bit integer variable declaration",
      documentation: "Declares an 8-bit integer variable",
      insertText: "const int8 ${1:name}[][] = { { $2 } };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "int16~~",
      kind: CompletionItemKind.Snippet,
      detail: "16-bit integer variable declaration",
      documentation: "Declares a 16-bit integer variable",
      insertText: "const int16 ${1:name}[][] = { { $2 } };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "uint8~~",
      kind: CompletionItemKind.Snippet,
      detail: "8-bit unsigned integer variable declaration",
      documentation: "Declares an 8-bit unsigned integer variable",
      insertText: "const uint8 ${1:name}[][] = { { $2 } };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    snippets.push({
      label: "uint16~~",
      kind: CompletionItemKind.Snippet,
      detail: "16-bit unsigned integer variable declaration",
      documentation: "Declares a 16-bit unsigned integer variable",
      insertText: "const uint16 ${1:name}[][] = { { $2 } };\n$0",
      insertTextFormat: 2, // Snippet format
    });

    return snippets;
  }
}
