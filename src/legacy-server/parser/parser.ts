import * as antlr from "antlr4ts";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { gpc_grammarLexer } from "./gpc_grammarLexer";
import { gpc_grammarParser } from "./gpc_grammarParser";
import { Visitor, GlobalSymbols } from "./visitor";

export interface ParseResult {
  visitor: Visitor;
  errors: Diagnostic[];
  syntaxErrors: Diagnostic[];
}

export class Parser {
  private static cachedResult: ParseResult | null = null;
  private static cachedInput: string | null = null;

  public static parse(input: string, globalSymbols?: GlobalSymbols): ParseResult {
    // Return cached result if input hasn't changed
    if (this.cachedInput === input && this.cachedResult && !globalSymbols) {
      return this.cachedResult;
    }

    const errors: Diagnostic[] = [];
    const chars = antlr.CharStreams.fromString(input);
    const lexer = new gpc_grammarLexer(chars);
    const tokens = new antlr.CommonTokenStream(lexer);
    const parser = new gpc_grammarParser(tokens);

    // Collect syntax errors
    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError: (recognizer, offendingSymbol, line, column, msg, e) => {
        errors.push({
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: line - 1, character: column },
            end: { line: line - 1, character: column + 1 },
          },
          message: `Syntax error: ${msg}`,
          source: "GPC Language Server",
        });
      },
    });

    let visitor: Visitor;
    try {
      const tree = parser.program();

      // Create visitor and visit the tree
      visitor = new Visitor(globalSymbols);
      visitor.visit(tree);

      // Add semantic errors from visitor
      errors.push(...visitor.getErrors());
    } catch (error) {
      visitor = new Visitor(globalSymbols); // Create empty visitor on error
      errors.push({
        severity: DiagnosticSeverity.Error,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
        message: `Parse error: ${error}`,
        source: "GPC Language Server",
      });
    }

    const result: ParseResult = {
      visitor,
      errors,
      syntaxErrors: errors.filter((e) => e.source === "GPC Language Server"),
    };

    // Cache the result
    this.cachedInput = input;
    this.cachedResult = result;

    return result;
  }

  public static getErrors(input: string, globalSymbols?: GlobalSymbols): Diagnostic[] {
    return this.parse(input, globalSymbols).errors;
  }

  public static getVisitor(input: string, globalSymbols?: GlobalSymbols): Visitor {
    return this.parse(input, globalSymbols).visitor;
  }

  public static clearCache(): void {
    this.cachedResult = null;
    this.cachedInput = null;
  }
}
