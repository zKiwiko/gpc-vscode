import { SemanticTokensBuilder } from "vscode-languageserver";
import { Parser } from "./parser/parser";
import { IncludeContext } from "./features";
import { fileURLToPath } from "url";
import * as path from "path";

// Token types - indices must match the legend
export const TOKEN_TYPES = [
  "variable",
  "function",
  "parameter",
  "property", // for constants
  "type",
] as const;

// Token modifiers - bit flags
export const TOKEN_MODIFIERS = [
  "declaration",
  "definition",
  "readonly",
  "defaultLibrary", // built-in
  "modification", // being assigned
] as const;

// Custom modifier for symbols from includes (as a pseudo-modifier via token type)
// We'll use a separate approach: track fromInclude symbols differently

export class SemanticTokensProvider {
  /**
   * Get semantic tokens for a document
   */
  public static getSemanticTokens(context: IncludeContext): { data: number[] } {
    const builder = new SemanticTokensBuilder();
    const tokens: Array<{
      line: number;
      char: number;
      length: number;
      tokenType: number;
      tokenModifiers: number;
    }> = [];

    // Parse preprocessed content to get all symbols
    const visitor = Parser.getVisitor(context.processedText);
    const originalLines = context.originalText.split("\n");
    const mainFilePath = fileURLToPath(context.mainUri);

    // Build a set of symbols that come from includes
    const symbolsFromIncludes = new Set<string>();

    // Check each symbol's declaration location using source map
    const processedLines = context.processedText.split("\n");

    // Find symbols declared in included files by checking source map
    for (let i = 0; i < processedLines.length; i++) {
      const line = processedLines[i];
      const mapping = context.sourceMap.find((m) => m.processedLine === i);

      if (mapping && mapping.originalFile !== mainFilePath) {
        // This line is from an included file - check for declarations

        // Check for function declarations
        const funcMatch = line.match(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
        if (funcMatch) {
          symbolsFromIncludes.add(funcMatch[1]);
        }

        // Check for variable declarations
        const varMatch = line.match(
          /(?:int|int8|int16|int32|uint8|uint16|uint32|ps5adt|define|const)\s+([a-zA-Z_][a-zA-Z0-9_]*)/,
        );
        if (varMatch) {
          symbolsFromIncludes.add(varMatch[1]);
        }
      }
    }

    // Now scan original text for identifiers and mark them
    for (let lineIndex = 0; lineIndex < originalLines.length; lineIndex++) {
      const line = originalLines[lineIndex];

      // Skip include directives and comments
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("#include") || trimmedLine.startsWith("//")) {
        continue;
      }

      // Find all identifiers in this line using regex
      const identifierRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
      let match;

      while ((match = identifierRegex.exec(line)) !== null) {
        const name = match[1];
        const charIndex = match.index;

        // Skip keywords and types
        const keywords = new Set([
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
          "int",
          "int8",
          "int16",
          "int32",
          "uint8",
          "uint16",
          "uint32",
          "ps5adt",
          "string",
          "data",
          "image",
        ]);

        if (keywords.has(name)) {
          continue;
        }

        let tokenType = -1;
        let modifiers = 0;

        // Check if it's a user function
        if (visitor.Functions.has(name)) {
          tokenType = TOKEN_TYPES.indexOf("function");
          if (symbolsFromIncludes.has(name)) {
            // Use modification flag to indicate it's from an include
            // This is a hack, but LSP doesn't support custom modifiers easily
            modifiers |= 1 << TOKEN_MODIFIERS.indexOf("modification");
          }
        }
        // Check if it's a built-in function
        else if (visitor.CFunctions.has(name)) {
          tokenType = TOKEN_TYPES.indexOf("function");
          modifiers |= 1 << TOKEN_MODIFIERS.indexOf("defaultLibrary");
        }
        // Check if it's a user variable
        else if (visitor.Variables.has(name)) {
          const variable = visitor.Variables.get(name)!;
          tokenType = TOKEN_TYPES.indexOf("variable");
          if (variable.const) {
            modifiers |= 1 << TOKEN_MODIFIERS.indexOf("readonly");
          }
          if (symbolsFromIncludes.has(name)) {
            modifiers |= 1 << TOKEN_MODIFIERS.indexOf("modification");
          }
        }
        // Check if it's a built-in constant
        else if (visitor.Constants.has(name)) {
          tokenType = TOKEN_TYPES.indexOf("property");
          modifiers |= 1 << TOKEN_MODIFIERS.indexOf("readonly");
          modifiers |= 1 << TOKEN_MODIFIERS.indexOf("defaultLibrary");
        }
        // Check if it's a combo
        else if (visitor.Combos.has(name)) {
          tokenType = TOKEN_TYPES.indexOf("type");
          if (symbolsFromIncludes.has(name)) {
            modifiers |= 1 << TOKEN_MODIFIERS.indexOf("modification");
          }
        }

        if (tokenType >= 0) {
          tokens.push({
            line: lineIndex,
            char: charIndex,
            length: name.length,
            tokenType,
            tokenModifiers: modifiers,
          });
        }
      }
    }

    // Sort tokens by position (required by LSP)
    tokens.sort((a, b) => {
      if (a.line !== b.line) {
        return a.line - b.line;
      }
      return a.char - b.char;
    });

    // Build semantic tokens using relative encoding
    let prevLine = 0;
    let prevChar = 0;

    for (const token of tokens) {
      const deltaLine = token.line - prevLine;
      const deltaChar = deltaLine === 0 ? token.char - prevChar : token.char;

      builder.push(
        deltaLine,
        deltaChar,
        token.length,
        token.tokenType,
        token.tokenModifiers,
      );

      prevLine = token.line;
      prevChar = token.char;
    }

    return builder.build();
  }
}
