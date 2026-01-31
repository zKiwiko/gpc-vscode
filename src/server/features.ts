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
import { SourceMapping } from "./preprocessor";
import { WorkspaceIndex } from "./workspaceIndex";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";

/** Context for include-aware language features */
export interface IncludeContext {
  /** Original document text (for position-based operations) */
  originalText: string;
  /** Preprocessed text with includes expanded (for symbol lookup) */
  processedText: string;
  /** Source mappings from preprocessor */
  sourceMap: SourceMapping[];
  /** URI of the main document */
  mainUri: string;
}

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
    includeDeclaration: boolean = true,
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

  /**
   * Find all references to a symbol across included files
   */
  public static getReferencesWithIncludes(
    context: IncludeContext,
    position: Position,
    includeDeclaration: boolean = true,
  ): Location[] {
    const word = this.getWordAtPosition(context.originalText, position);
    if (!word) {
      return [];
    }

    const references: Location[] = [];
    const processedLines = context.processedText.split("\n");

    // Find all occurrences in preprocessed text (includes expanded)
    for (let lineIndex = 0; lineIndex < processedLines.length; lineIndex++) {
      const line = processedLines[lineIndex];
      let charIndex = 0;

      while ((charIndex = line.indexOf(word, charIndex)) !== -1) {
        // Make sure it's a whole word
        const before = charIndex > 0 ? line[charIndex - 1] : " ";
        const after =
          charIndex + word.length < line.length
            ? line[charIndex + word.length]
            : " ";

        if (!/[a-zA-Z0-9_]/.test(before) && !/[a-zA-Z0-9_]/.test(after)) {
          // Map back to original file using source map
          const mapping = context.sourceMap.find(
            (m) => m.processedLine === lineIndex,
          );
          if (mapping) {
            references.push({
              uri: this.pathToUri(mapping.originalFile),
              range: {
                start: { line: mapping.originalLine, character: charIndex },
                end: {
                  line: mapping.originalLine,
                  character: charIndex + word.length,
                },
              },
            });
          }
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
    diagnostics: any[],
    includeContext?: IncludeContext,
    workspaceIndex?: WorkspaceIndex,
  ): any[] {
    const actions: any[] = [];

    // Use preprocessed text for symbol lookup if available
    const text = includeContext ? includeContext.processedText : input;
    const visitor = Parser.getVisitor(text);

    for (const diagnostic of diagnostics) {
      // Quick fix for undefined functions/variables - suggest available symbols
      if (diagnostic.message.includes("is not defined")) {
        const symbolName = diagnostic.message.match(/'([^']+)'/)?.[1];
        if (symbolName) {
          const searchPrefix = symbolName.toLowerCase().substring(0, 3);

          // Combine built-in and user-defined functions for suggestions
          const functionSuggestions: Array<{
            name: string;
            sourceFile?: string;
            isBuiltIn: boolean;
          }> = [];

          // Add built-in functions
          for (const [name, func] of visitor.CFunctions.entries()) {
            if (name.toLowerCase().includes(searchPrefix)) {
              functionSuggestions.push({ name, isBuiltIn: true });
            }
          }

          // Add user-defined functions (including from includes)
          for (const [name, func] of visitor.Functions.entries()) {
            if (name.toLowerCase().includes(searchPrefix)) {
              functionSuggestions.push({
                name,
                sourceFile: func.sourceFile,
                isBuiltIn: false,
              });
            }
          }

          // Add variable suggestions for variable errors
          if (diagnostic.message.includes("Variable")) {
            for (const [name, variable] of visitor.Variables.entries()) {
              if (name.toLowerCase().includes(searchPrefix)) {
                functionSuggestions.push({
                  name,
                  sourceFile: variable.sourceFile,
                  isBuiltIn: false,
                });
              }
            }
          }

          // Limit to 5 suggestions
          const suggestions = functionSuggestions.slice(0, 5);

          for (const suggestion of suggestions) {
            let title = `Did you mean '${suggestion.name}'?`;

            // Show source file for functions from includes
            if (
              !suggestion.isBuiltIn &&
              suggestion.sourceFile &&
              includeContext
            ) {
              const fileName = path.basename(suggestion.sourceFile);
              const mainFile = includeContext.mainUri.split("/").pop() || "";
              if (fileName !== mainFile) {
                title = `Did you mean '${suggestion.name}' from ${fileName}?`;
              }
            }

            actions.push({
              title,
              kind: "quickfix",
              edit: {
                changes: {
                  [range.uri]: [
                    {
                      range: diagnostic.range,
                      newText: suggestion.name,
                    },
                  ],
                },
              },
            });
          }

          // Search workspace index for exact match to suggest adding #include
          if (workspaceIndex && includeContext) {
            const workspaceSymbols = workspaceIndex.findSymbol(symbolName);
            const currentFilePath = fileURLToPath(includeContext.mainUri);

            for (const symbol of workspaceSymbols) {
              // Skip if the symbol is in the current file
              if (symbol.filePath === currentFilePath) {
                continue;
              }

              // Calculate relative path from current file to the symbol's file
              const relativePath = workspaceIndex.getRelativePath(
                symbol.filePath,
                currentFilePath,
              );

              // Find the first line to insert the #include (after any existing includes or at top)
              const lines = input.split("\n");
              let insertLine = 0;
              for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().startsWith("#include")) {
                  insertLine = i + 1;
                }
              }

              actions.push({
                title: `Add #include "${relativePath}"`,
                kind: "quickfix",
                edit: {
                  changes: {
                    [range.uri]: [
                      {
                        range: {
                          start: { line: insertLine, character: 0 },
                          end: { line: insertLine, character: 0 },
                        },
                        newText: `#include "${relativePath}"\n`,
                      },
                    ],
                  },
                },
                diagnostics: [diagnostic],
              });
            }
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
    position: Position,
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
      functionStart + 1,
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
      }),
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
    config?: { inlayHintsEnabled: boolean; parameterNamesEnabled: boolean },
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
    position: Position,
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

  /**
   * Get hover info with include support.
   * Uses original text for cursor position, but looks up symbols from preprocessed content.
   */
  public static getHoverInfoWithIncludes(
    context: IncludeContext,
    position: Position,
  ): Hover | null {
    // Get the word from the original text at cursor position
    const word = this.getWordAtPosition(context.originalText, position);
    if (!word) {
      return null;
    }

    // Get visitor from preprocessed content (has all symbols including from includes)
    const visitor = Parser.getVisitor(context.processedText);

    // Check variables
    const variable = visitor.Variables.get(word) || visitor.Constants.get(word);
    if (variable) {
      const type = visitor.Constants.has(word)
        ? "Built-in Constant"
        : variable.const
          ? "Constant"
          : "Variable";

      // Check if it's from an included file
      const sourceInfo = this.findSymbolSource(word, context, "variable");

      let value = `**${type}**: \`${word}\``;
      if (sourceInfo && sourceInfo.file !== context.mainUri) {
        value += `\n\n*Defined in: ${this.getFileName(sourceInfo.file)}*`;
      }

      return {
        contents: {
          kind: MarkupKind.Markdown,
          value: value,
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

      // Check if it's from an included file
      if (!visitor.CFunctions.has(word)) {
        const sourceInfo = this.findSymbolSource(word, context, "function");
        if (sourceInfo && sourceInfo.file !== context.mainUri) {
          value += `\n\n*Defined in: ${this.getFileName(sourceInfo.file)}*`;
        }
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

  /**
   * Get definition with include support.
   * Searches in preprocessed content and maps back to original file locations.
   */
  public static getDefinitionWithIncludes(
    context: IncludeContext,
    position: Position,
  ): Location[] {
    const word = this.getWordAtPosition(context.originalText, position);
    if (!word) {
      return [];
    }

    const lines = context.processedText.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      // Look for variable declarations
      const varMatch = line.match(
        new RegExp(
          `(int|int8|int16|int32|uint8|uint16|uint32|define|const)\\s+${word}\\b`,
        ),
      );
      if (varMatch) {
        const charIndex = line.indexOf(word, varMatch.index);
        if (charIndex !== -1) {
          // Map back to original file
          const mapping = context.sourceMap.find(
            (m) => m.processedLine === lineIndex,
          );
          if (mapping) {
            return [
              {
                uri: this.pathToUri(mapping.originalFile),
                range: {
                  start: { line: mapping.originalLine, character: charIndex },
                  end: {
                    line: mapping.originalLine,
                    character: charIndex + word.length,
                  },
                },
              },
            ];
          }
        }
      }

      // Look for function declarations
      if (line.includes(`function ${word}`)) {
        const charIndex = line.indexOf(word);
        if (charIndex !== -1) {
          // Map back to original file
          const mapping = context.sourceMap.find(
            (m) => m.processedLine === lineIndex,
          );
          if (mapping) {
            return [
              {
                uri: this.pathToUri(mapping.originalFile),
                range: {
                  start: { line: mapping.originalLine, character: charIndex },
                  end: {
                    line: mapping.originalLine,
                    character: charIndex + word.length,
                  },
                },
              },
            ];
          }
        }
      }
    }

    return [];
  }

  /**
   * Get signature help with include support.
   */
  public static getSignatureHelpWithIncludes(
    context: IncludeContext,
    position: Position,
  ): SignatureHelp | null {
    // Get visitor from preprocessed content (has all function signatures)
    const visitor = Parser.getVisitor(context.processedText);
    const lines = context.originalText.split("\n");
    const currentLine = lines[position.line];

    if (!currentLine) {
      return null;
    }

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
      functionStart + 1,
    );

    // Find the function definition (from preprocessed content's visitor)
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
      }),
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

  /**
   * Find where a symbol is defined in the source
   */
  private static findSymbolSource(
    symbolName: string,
    context: IncludeContext,
    symbolType: "variable" | "function",
  ): { file: string; line: number } | null {
    const lines = context.processedText.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      let found = false;

      if (symbolType === "variable") {
        found = !!line.match(
          new RegExp(
            `(int|int8|int16|int32|uint8|uint16|uint32|define|const)\\s+${symbolName}\\b`,
          ),
        );
      } else if (symbolType === "function") {
        found = line.includes(`function ${symbolName}`);
      }

      if (found) {
        const mapping = context.sourceMap.find(
          (m) => m.processedLine === lineIndex,
        );
        if (mapping) {
          return { file: mapping.originalFile, line: mapping.originalLine };
        }
      }
    }

    return null;
  }

  /**
   * Extract filename from a path
   */
  private static getFileName(filePath: string): string {
    const parts = filePath.split(/[/\\]/);
    return parts[parts.length - 1] || filePath;
  }

  /**
   * Convert a file path to a file:// URI
   */
  private static pathToUri(filePath: string): string {
    // Use Node.js built-in for proper cross-platform URI creation and encoding
    return pathToFileURL(filePath).toString();
  }
}
