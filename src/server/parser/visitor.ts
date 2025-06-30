import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import {
  Array_decContext,
  AssignmentContext,
  Enum_decContext,
  Function_callContext,
  Function_decContext,
  PrimaryExpressionContext,
  ProgramContext,
  Variable_decContext,
} from "./gpc_grammarParser";
import { gpc_grammarVisitor } from "./gpc_grammarVisitor";

export interface Variable {
  name: string;
  const: boolean;
  used: boolean;
}

export interface Function {
  name: string;
  parameters: string[] | undefined;
  description?: string;
  used: boolean;
}

export class Visitor
  extends AbstractParseTreeVisitor<void>
  implements gpc_grammarVisitor<void>
{
  private errors: Diagnostic[] = [];
  public Variables: Map<string, Variable> = new Map<string, Variable>();
  public Constants: Map<string, Variable> = new Map<string, Variable>();
  public Functions: Map<string, Function> = new Map<string, Function>();
  public CFunctions: Map<string, Function> = new Map<string, Function>();

  private isFirstPass: boolean = true;

  public static getVariables(visitor: Visitor): Variable[] {
    return Array.from(visitor.Variables.values());
  }

  constructor() {
    super();
    this.loadConstants();
    this.loadFunctions();
  }

  public getErrors(): Diagnostic[] {
    return this.errors;
  }

  // Track when variables are used in primary expressions
  visitPrimaryExpression(ctx: PrimaryExpressionContext): void {
    if (!this.isFirstPass) {
      // Only validate variable usage in the second pass
      if (ctx.ID && ctx.ID()) {
        const idName = ctx.ID()!.text;
        // Usage tracking can be implemented here later if needed
      }
    }
    return this.visitChildren(ctx);
  }

  // Track when variables are used in assignments
  visitAssignment(ctx: AssignmentContext): void {
    if (!this.isFirstPass) {
      // Only validate assignment targets in the second pass
      if (ctx.ID && ctx.ID()) {
        const idName = ctx.ID()!.text;
        // Usage tracking can be implemented here later if needed
      }
    }
    return this.visitChildren(ctx);
  }

  private addError(
    ctx: any,
    message: string,
    severity: DiagnosticSeverity = DiagnosticSeverity.Error
  ) {
    const start = ctx?.start || ctx?._start;
    const stop = ctx?.stop || ctx?._stop || ctx?.start || ctx?._start;

    if (start) {
      this.errors.push({
        severity,
        range: {
          start: { line: start.line - 1, character: start.charPositionInLine },
          end: {
            line: stop.line - 1,
            character: stop.charPositionInLine + (stop.text?.length || 1),
          },
        },
        message,
        source: "GPC Semantic Analyzer",
      });
    } else {
      // If no context, add error with default position
      this.errors.push({
        severity,
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 1 },
        },
        message,
        source: "GPC Semantic Analyzer",
      });
    }
  }

  private addWarning(ctx: any, message: string) {
    this.addError(ctx, message, DiagnosticSeverity.Warning);
  }

  private loadConstants(): void {
    try {
      const CONSTANTS = require("../data/constants.json");
      for (const constant of CONSTANTS) {
        if (this.Constants.has(constant)) {
          continue; // Skip duplicates
        }
        // add each to the variables list
        this.Constants.set(constant, {
          name: constant,
          const: true,
          used: false,
        });
      }
    } catch (error) {
      console.error("Error loading constants:", error);
    }
  }

  private loadFunctions(): void {
    try {
      const FUNCTIONS = require("../data/functions.json");
      for (const func of FUNCTIONS) {
        if (this.CFunctions.has(func.name)) {
          continue; // Skip duplicates
        }
        // add each to the functions list
        this.CFunctions.set(func.name, {
          name: func.name,
          parameters: func.parameters, // Use the actual parameter names from the JSON
          description: func.description, // Include the description
          used: false,
        });
      }
    } catch (error) {
      console.error("Error loading functions:", error);
    }
  }

  // Visit the root program node
  visitProgram(ctx: ProgramContext): void {
    // First pass: collect all declarations
    this.isFirstPass = true;
    for (let i = 0; i < ctx.global_statement().length; i++) {
      this.visit(ctx.global_statement(i));
    }

    // Second pass: validate references and semantics
    this.isFirstPass = false;
    for (let i = 0; i < ctx.global_statement().length; i++) {
      this.visit(ctx.global_statement(i));
    }

    return;
  }

  // Visit function declarations
  visitFunction_dec(ctx: Function_decContext): void {
    const functionName = ctx.ID().text;

    if (this.isFirstPass) {
      // First pass: just collect the function declaration
      if (this.Functions.has(functionName)) {
        this.addError(ctx, `Function '${functionName}' is already defined.`);
      }

      if (this.Constants.has(functionName)) {
        this.addError(
          ctx,
          `Function '${functionName}' conflicts with a built-in constant.`
        );
      }

      // Add function to the list
      this.Functions.set(functionName, {
        name: functionName,
        parameters: ctx.parameter_list()
          ? ctx
              .parameter_list()
              ?.parameter()
              .map((p) => p.ID().text)
          : [],
        used: false,
      });
    } else {
      // Second pass: validate the function body
      return this.visitChildren(ctx);
    }
  }

  // Visit variable declarations
  visitVariable_dec(ctx: Variable_decContext): void {
    if (this.isFirstPass) {
      // First pass: collect variable declarations
      for (const declarator of ctx.variable_declarator()) {
        const variableName = declarator.ID().text;

        if (this.Constants.has(variableName)) {
          this.addError(
            declarator,
            `Variable '${variableName}' conflicts with a built-in constant.`
          );
        }

        if (this.Variables.has(variableName)) {
          this.addError(
            declarator,
            `Variable '${variableName}' is already defined.`
          );
        } else {
          if (ctx.text.startsWith("define")) {
            this.Variables.set(variableName, {
              name: variableName,
              const: true,
              used: false,
            });
          } else {
            this.Variables.set(variableName, {
              name: variableName,
              const: false,
              used: false,
            });
          }
        }
      }

      // Check variable naming conventions
      ctx.variable_declarator().forEach((declarator) => {
        const varName = declarator.ID().text;
        if (varName.length > 50) {
          this.addError(
            declarator,
            `Variable name '${varName}' is too long (max 50 characters).`
          );
        }
      });
    } else {
      // Second pass: validate variable usage and expressions
      return this.visitChildren(ctx);
    }
  }

  // Visit array declarations
  visitArray_dec(ctx: Array_decContext): void {
    if (this.isFirstPass) {
      // First pass: collect array declarations
      const arrayName = ctx.ID().text;

      if (this.Constants.has(arrayName)) {
        this.addError(
          ctx,
          `Array '${arrayName}' name conflicts with a built-in constant.`
        );
      }

      if (this.Variables.has(arrayName)) {
        this.addError(
          ctx,
          `Array '${arrayName}' is already defined or shares a name with a Variable.`
        );
      }

      // Add the array to the variables list
      this.Variables.set(arrayName, {
        name: arrayName,
        const: true,
        used: false,
      });
    } else {
      // Second pass: validate array initialization and expressions
      return this.visitChildren(ctx);
    }
  }

  // Visit enum declarations
  visitEnum_dec(ctx: Enum_decContext): void {
    if (this.isFirstPass) {
      // First pass: collect enum values
      for (const enumValue of ctx.enum_value()) {
        const valueName = enumValue.ID().text;
        if (
          ctx.enum_value().filter((v) => v.ID().text === valueName).length > 1
        ) {
          this.addError(enumValue, `Duplicate enum value: '${valueName}'`);
        }
        if (this.Variables.has(valueName)) {
          this.addError(
            enumValue,
            `Enum value '${valueName}' conflicts with a variable or array.`
          );
        }

        // Check if enum value name follows naming conventions.
        // All Uppercase with underscores, numbers are alright
        if (!/^[A-Z0-9_]+$/.test(valueName)) {
          this.addWarning(
            enumValue,
            `Enum value '${valueName}' should be uppercase and can only contain underscores.`
          );
        }

        // Add the enum value to the variables list
        this.Variables.set(valueName, {
          name: valueName,
          const: false,
          used: false,
        });
      }
    } else {
      // Second pass: validate enum expressions
      return this.visitChildren(ctx);
    }
  }

  visitFunction_call(ctx: Function_callContext): void {
    if (!this.isFirstPass) {
      // Only validate function calls in the second pass
      const functionName = ctx.ID().text;

      // Check if function is defined
      if (
        !this.Functions.has(functionName) &&
        !this.CFunctions.has(functionName)
      ) {
        this.addError(ctx, `Function '${functionName}' is not defined.`);
        return;
      }

      // Get function for parameter checking - check both user-defined and built-in functions
      const func =
        this.Functions.get(functionName) || this.CFunctions.get(functionName);

      // Check if function call parameters match the definition
      const expectedParams = func?.parameters || [];
      const actualParams = ctx.expression().map((e) => e.text);

      if (expectedParams.length !== actualParams.length) {
        this.addError(
          ctx,
          `Function '${functionName}' expects ${expectedParams.length} parameters, but got ${actualParams.length}.`
        );
      }
    }

    return this.visitChildren(ctx);
  }

  // Handle main, init, and combo blocks
  visitMain_dec(ctx: any): void {
    if (!this.isFirstPass) {
      // Only validate main block contents in second pass
      return this.visitChildren(ctx);
    }
  }

  visitInit_dec(ctx: any): void {
    if (!this.isFirstPass) {
      // Only validate init block contents in second pass
      return this.visitChildren(ctx);
    }
  }

  visitCombo_dec(ctx: any): void {
    if (this.isFirstPass) {
      // First pass: collect combo name if needed
      // Combos are similar to functions but don't have parameters
      const comboName = ctx.ID().text;
      // You could track combos separately if needed
    } else {
      // Second pass: validate combo contents
      return this.visitChildren(ctx);
    }
  }

  protected defaultResult(): void {
    return;
  }

  visitChildren(node: ParseTree): void {
    for (let i = 0; i < node.childCount; i++) {
      this.visit(node.getChild(i));
    }
    return this.defaultResult();
  }
}
