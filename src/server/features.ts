import {
  DocumentSymbol,
  Hover,
  InlayHint,
  InlayHintKind,
  Location,
  MarkupKind,
  ParameterInformation,
  Position,
  SignatureHelp,
  SignatureInformation,
  SymbolKind,
} from "vscode-languageserver";
import { Parser } from "./parser/parser";

export class LanguageFeatures {
  public static getHoverInfo(input: string, position: Position): Hover | null {
    const visitor = Parser.getVisitor(input);
    const word = this.getWordAtPosition(input, position);

    if (!word) {
      return null;
    }

    // Check variables
    const variable = visitor.Variables.get(word) || visitor.Constants.get(word);
    if (variable) {
      const type = visitor.Constants.has(word)
        ? "Built-in Constant"
        : variable.const
        ? "Constant"
        : "Variable";

      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: `**${type}**: \`${word}\``,
        },
      };
    }

    // Check functions
    const func = visitor.Functions.get(word) || visitor.CFunctions.get(word);
    if (func) {
      const type = visitor.CFunctions.has(word)
        ? "Built-in Function"
        : "User Function";
      const params = func.parameters?.join(", ") || "";

      let value = `**${type}**: \`${word}(${params})\``;

      // Add description for built-in functions
      if (func.description && visitor.CFunctions.has(word)) {
        value += `\n\n${func.description}`;
      }

      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: value,
        },
      };
    }

    return null;
  }

  public static getDefinition(input: string, position: Position): Location[] {
    const visitor = Parser.getVisitor(input);
    const word = this.getWordAtPosition(input, position);

    if (!word) {
      return [];
    }

    // For now, we'll return the first occurrence in the document
    // In a real implementation, you'd want to track declaration positions in the visitor
    const lines = input.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      // Look for variable declarations
      if (line.includes(`int ${word}`) || line.includes(`define ${word}`)) {
        const charIndex = line.indexOf(word);
        if (charIndex !== -1) {
          return [
            {
              uri: "", // This would be the document URI in practice
              range: {
                start: { line: lineIndex, character: charIndex },
                end: { line: lineIndex, character: charIndex + word.length },
              },
            },
          ];
        }
      }

      // Look for function declarations
      if (line.includes(`function ${word}`)) {
        const charIndex = line.indexOf(word);
        if (charIndex !== -1) {
          return [
            {
              uri: "", // This would be the document URI in practice
              range: {
                start: { line: lineIndex, character: charIndex },
                end: { line: lineIndex, character: charIndex + word.length },
              },
            },
          ];
        }
      }
    }

    return [];
  }

  public static getReferences(
    input: string,
    position: Position,
    includeDeclaration: boolean = true
  ): Location[] {
    const visitor = Parser.getVisitor(input);
    const word = this.getWordAtPosition(input, position);

    if (!word) {
      return [];
    }

    const references: Location[] = [];
    const lines = input.split("\n");

    // Find all occurrences of the word
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      let charIndex = 0;

      while ((charIndex = line.indexOf(word, charIndex)) !== -1) {
        // Make sure it's a whole word (not part of another identifier)
        const before = charIndex > 0 ? line[charIndex - 1] : " ";
        const after =
          charIndex + word.length < line.length
            ? line[charIndex + word.length]
            : " ";

        if (!/[a-zA-Z0-9_]/.test(before) && !/[a-zA-Z0-9_]/.test(after)) {
          references.push({
            uri: "", // This would be the document URI in practice
            range: {
              start: { line: lineIndex, character: charIndex },
              end: { line: lineIndex, character: charIndex + word.length },
            },
          });
        }

        charIndex += word.length;
      }
    }

    return references;
  }

  public static getDocumentSymbols(input: string): DocumentSymbol[] {
    const visitor = Parser.getVisitor(input);
    const symbols: DocumentSymbol[] = [];
    const lines = input.split("\n");

    // Add functions
    for (const func of visitor.Functions.values()) {
      // Find function declaration in source
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        if (line.includes(`function ${func.name}`)) {
          const charIndex = line.indexOf(func.name);
          if (charIndex !== -1) {
            symbols.push({
              name: func.name,
              detail: `(${func.parameters?.join(", ") || ""})`,
              kind: SymbolKind.Function,
              range: {
                start: { line: lineIndex, character: 0 },
                end: { line: lineIndex, character: line.length },
              },
              selectionRange: {
                start: { line: lineIndex, character: charIndex },
                end: {
                  line: lineIndex,
                  character: charIndex + func.name.length,
                },
              },
            });
            break;
          }
        }
      }
    }

    // Add variables and constants
    for (const variable of visitor.Variables.values()) {
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        if (
          (line.includes(`int ${variable.name}`) ||
            line.includes(`define ${variable.name}`)) &&
          !line.includes("function")
        ) {
          const charIndex = line.indexOf(variable.name);
          if (charIndex !== -1) {
            symbols.push({
              name: variable.name,
              kind: variable.const ? SymbolKind.Constant : SymbolKind.Variable,
              range: {
                start: { line: lineIndex, character: 0 },
                end: { line: lineIndex, character: line.length },
              },
              selectionRange: {
                start: { line: lineIndex, character: charIndex },
                end: {
                  line: lineIndex,
                  character: charIndex + variable.name.length,
                },
              },
            });
            break;
          }
        }
      }
    }

    return symbols;
  }

  public static getCodeActions(
    input: string,
    range: any,
    diagnostics: any[]
  ): any[] {
    const actions: any[] = [];

    for (const diagnostic of diagnostics) {
      // Quick fix for undefined functions - suggest available functions
      if (diagnostic.message.includes("is not defined")) {
        const functionName = diagnostic.message.match(/'([^']+)'/)?.[1];
        if (functionName) {
          const visitor = Parser.getVisitor(input);
          const suggestions = Array.from(visitor.CFunctions.keys())
            .filter((name) =>
              name
                .toLowerCase()
                .includes(functionName.toLowerCase().substring(0, 3))
            )
            .slice(0, 5);

          for (const suggestion of suggestions) {
            actions.push({
              title: `Did you mean '${suggestion}'?`,
              kind: "quickfix",
              edit: {
                changes: {
                  [range.uri]: [
                    {
                      range: diagnostic.range,
                      newText: suggestion,
                    },
                  ],
                },
              },
            });
          }
        }
      }

      // Quick fix for parameter count mismatches
      if (
        diagnostic.message.includes("expects") &&
        diagnostic.message.includes("parameters")
      ) {
        actions.push({
          title: "Show function signature",
          kind: "quickfix",
          command: {
            title: "Show signature",
            command: "editor.action.triggerParameterHints",
          },
        });
      }
    }

    return actions;
  }

  public static getSignatureHelp(
    input: string,
    position: Position
  ): SignatureHelp | null {
    const visitor = Parser.getVisitor(input);
    const lines = input.split("\n");
    const currentLine = lines[position.line];

    // Find function call context - look for function name followed by open paren
    let functionStart = position.character - 1;
    let parenCount = 0;
    let foundFunction = false;

    // Walk backwards to find the function call
    for (let i = position.character - 1; i >= 0; i--) {
      const char = currentLine[i];

      if (char === ")") {
        parenCount++;
      } else if (char === "(") {
        parenCount--;
        if (parenCount < 0) {
          // Found the opening paren of our function call
          functionStart = i - 1;
          foundFunction = true;
          break;
        }
      }
    }

    if (!foundFunction) {
      return null;
    }

    // Extract function name
    let functionNameStart = functionStart;
    while (
      functionNameStart >= 0 &&
      /[a-zA-Z0-9_]/.test(currentLine[functionNameStart])
    ) {
      functionNameStart--;
    }
    functionNameStart++;

    const functionName = currentLine.substring(
      functionNameStart,
      functionStart + 1
    );

    // Find the function definition
    const func =
      visitor.Functions.get(functionName) ||
      visitor.CFunctions.get(functionName);
    if (!func) {
      return null;
    }

    // Count current parameter position
    let paramIndex = 0;
    let commaCount = 0;
    for (let i = functionStart + 2; i <= position.character; i++) {
      if (currentLine[i] === ",") {
        commaCount++;
      }
    }
    paramIndex = commaCount;

    // Create signature information
    const parameters: ParameterInformation[] = (func.parameters || []).map(
      (param) => ({
        label: param,
        documentation: `Parameter: ${param}`,
      })
    );

    const signature: SignatureInformation = {
      label: `${functionName}(${func.parameters?.join(", ") || ""})`,
      documentation: func.description || `Function: ${functionName}`,
      parameters: parameters,
    };

    return {
      signatures: [signature],
      activeSignature: 0,
      activeParameter: Math.min(paramIndex, parameters.length - 1),
    };
  }

  public static getInlayHints(
    input: string,
    range: any,
    config?: { inlayHintsEnabled: boolean; parameterNamesEnabled: boolean }
  ): InlayHint[] {
    const visitor = Parser.getVisitor(input);
    const hints: InlayHint[] = [];
    const lines = input.split("\n");

    // Use default config if not provided
    const configuration = config || {
      inlayHintsEnabled: true,
      parameterNamesEnabled: true,
    };

    // Return early if inlay hints are disabled
    if (!configuration.inlayHintsEnabled) {
      return [];
    }

    // Process lines within the requested range
    const startLine = range.start.line;
    const endLine = range.end.line;

    for (
      let lineIndex = startLine;
      lineIndex <= endLine && lineIndex < lines.length;
      lineIndex++
    ) {
      const line = lines[lineIndex];

      // Find function calls in this line using regex
      const functionCallRegex = /(\w+)\s*\(/g;
      let match;

      while ((match = functionCallRegex.exec(line)) !== null) {
        const functionName = match[1];
        const functionStart = match.index;

        // Check if this is a known function
        const func =
          visitor.Functions.get(functionName) ||
          visitor.CFunctions.get(functionName);

        if (func && func.parameters && func.parameters.length > 0) {
          // Find the opening parenthesis
          const openParenIndex = line.indexOf("(", functionStart);
          if (openParenIndex === -1) {
            continue;
          }

          // Find the closing parenthesis (simple approach - doesn't handle nested calls)
          let parenCount = 1;
          let closeParenIndex = openParenIndex + 1;
          let inString = false;
          let stringChar = "";

          while (closeParenIndex < line.length && parenCount > 0) {
            const char = line[closeParenIndex];

            if (!inString) {
              if (char === '"' || char === "'") {
                inString = true;
                stringChar = char;
              } else if (char === "(") {
                parenCount++;
              } else if (char === ")") {
                parenCount--;
              }
            } else {
              if (char === stringChar && line[closeParenIndex - 1] !== "\\") {
                inString = false;
              }
            }
            closeParenIndex++;
          }

          if (parenCount === 0) {
            // Extract the arguments
            const argsString = line
              .substring(openParenIndex + 1, closeParenIndex - 1)
              .trim();

            if (argsString.length > 0) {
              // Split arguments by comma (simple approach)
              const args = this.parseArguments(argsString);

              // Create inlay hints for each parameter
              let currentPos = openParenIndex + 1;
              let argIndex = 0;

              for (
                let i = 0;
                i < args.length && argIndex < func.parameters.length;
                i++
              ) {
                const arg = args[i].trim();
                if (arg.length === 0) {
                  continue;
                }

                // Find the position of this argument in the line
                const argPos = line.indexOf(arg, currentPos);
                if (argPos !== -1 && configuration.parameterNamesEnabled) {
                  // Add inlay hint before the argument (only if parameter names are enabled)
                  hints.push({
                    position: { line: lineIndex, character: argPos },
                    label: `${func.parameters[argIndex]}:`,
                    kind: InlayHintKind.Parameter,
                    paddingRight: true,
                  });

                  currentPos = argPos + arg.length;
                }
                argIndex++;
              }
            }
          }
        }
      }
    }

    return hints;
  }

  private static parseArguments(argsString: string): string[] {
    const args: string[] = [];
    let currentArg = "";
    let parenCount = 0;
    let inString = false;
    let stringChar = "";

    for (let i = 0; i < argsString.length; i++) {
      const char = argsString[i];

      if (!inString) {
        if (char === '"' || char === "'") {
          inString = true;
          stringChar = char;
          currentArg += char;
        } else if (char === "(") {
          parenCount++;
          currentArg += char;
        } else if (char === ")") {
          parenCount--;
          currentArg += char;
        } else if (char === "," && parenCount === 0) {
          args.push(currentArg.trim());
          currentArg = "";
        } else {
          currentArg += char;
        }
      } else {
        currentArg += char;
        if (char === stringChar && argsString[i - 1] !== "\\") {
          inString = false;
        }
      }
    }

    if (currentArg.trim().length > 0) {
      args.push(currentArg.trim());
    }

    return args;
  }

  private static getWordAtPosition(
    input: string,
    position: Position
  ): string | null {
    const lines = input.split("\n");
    if (position.line >= lines.length) {
      return null;
    }

    const line = lines[position.line];
    if (position.character >= line.length) {
      return null;
    }

    // Find word boundaries
    let start = position.character;
    let end = position.character;

    // Move start back to beginning of word
    while (start > 0 && /[a-zA-Z0-9_]/.test(line[start - 1])) {
      start--;
    }

    // Move end forward to end of word
    while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) {
      end++;
    }

    if (start === end) {
      return null;
    }

    return line.substring(start, end);
  }
}
