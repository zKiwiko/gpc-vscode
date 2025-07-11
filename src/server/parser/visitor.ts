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
  public Combos: Map<string, Variable> = new Map<string, Variable>();

  private isFirstPass: boolean = true;
  private currentParameters: Set<string> = new Set<string>();

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

  visitPrimaryExpression(ctx: PrimaryExpressionContext): void {
    if (!this.isFirstPass) {
      if (ctx.ID && ctx.ID()) {
        const idName = ctx.ID()!.text;

        if (
          !this.Constants.has(idName) &&
          !this.Variables.has(idName) &&
          !this.Combos.has(idName) &&
          !this.currentParameters.has(idName)
        ) {
          this.addError(ctx, `Variable '${idName}' is not defined`);
        }

        if (this.Variables.has(idName)) {
          const variable = this.Variables.get(idName);
          if (variable) {
            variable.used = true;
          }
        }
      }
    }
    return this.visitChildren(ctx);
  }

  visitAssignment(ctx: AssignmentContext): void {
    if (!this.isFirstPass) {
      if (ctx.ID && ctx.ID()) {
        const idName = ctx.ID()!.text;
        if (
          !this.Constants.has(idName) &&
          !this.Variables.has(idName) &&
          !this.Combos.has(idName) &&
          !this.currentParameters.has(idName)
        ) {
          this.addError(ctx, `Variable '${idName}' is not defined`);
        }

        if (this.Variables.has(idName)) {
          const variable = this.Variables.get(idName);
          if (variable?.const) {
            this.addError(
              ctx,
              `Constant Variable/Array '${idName}' cannot be modified or used in an assignment.`
            );
          }
          if (variable) {
            variable.used = true;
          }
        }

        if (this.Constants.has(idName)) {
          this.addError(
            ctx,
            `Built-in constant '${idName}' cannot be modified or used in an assignment.`
          );
        }
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

  /*
  private addWarning(ctx: any, message: string) {
    this.addError(ctx, message, DiagnosticSeverity.Warning);
  } */

  private addHint(ctx: any, message: string) {
    this.addError(ctx, message, DiagnosticSeverity.Hint);
  }

  private loadConstants(): void {
    try {
      const CONSTANTS = require("../data/constants.json");
      for (const constant of CONSTANTS) {
        if (this.Constants.has(constant)) {
          continue;
        }

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
          continue;
        }

        this.CFunctions.set(func.name, {
          name: func.name,
          parameters: func.parameters,
          description: func.description,
          used: false,
        });
      }
    } catch (error) {
      console.error("Error loading functions:", error);
    }
  }

  visitProgram(ctx: ProgramContext): void {
    this.isFirstPass = true;
    for (let i = 0; i < ctx.global_statement().length; i++) {
      this.visit(ctx.global_statement(i));
    }

    this.isFirstPass = false;
    for (let i = 0; i < ctx.global_statement().length; i++) {
      this.visit(ctx.global_statement(i));
    }

    return;
  }

  visitFunction_dec(ctx: Function_decContext): void {
    const functionName = ctx.ID().text;

    if (this.isFirstPass) {
      if (this.Functions.has(functionName)) {
        this.addError(ctx, `Function '${functionName}' is already defined.`);
      }

      if (
        this.CFunctions.has(functionName) ||
        this.Constants.has(functionName)
      ) {
        this.addError(
          ctx,
          `Function '${functionName}' conflicts with a built-in constant.`
        );
      }

      this.Functions.set(functionName, {
        name: functionName,
        parameters: ctx.parameter_list()
          ? ctx
              .parameter_list()!
              .parameter()
              .map((p) => p.ID().text)
          : [],
        used: false,
      });
    } else {
      const params = ctx.parameter_list()
        ? ctx
            .parameter_list()!
            .parameter()
            .map((p) => p.ID().text)
        : [];
      this.currentParameters = new Set(params);
      const result = this.visitChildren(ctx);
      this.currentParameters.clear();
      return result;
    }
  }

  visitVariable_dec(ctx: Variable_decContext): void {
    if (this.isFirstPass) {
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
          if (ctx.text.startsWith("define") || ctx.text.startsWith("const")) {
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
      return this.visitChildren(ctx);
    }
  }

  visitArray_dec(ctx: Array_decContext): void {
    if (this.isFirstPass) {
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

      this.Variables.set(arrayName, {
        name: arrayName,
        const: true,
        used: false,
      });
    } else {
      return this.visitChildren(ctx);
    }
  }

  visitEnum_dec(ctx: Enum_decContext): void {
    if (this.isFirstPass) {
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

        if (!/^[A-Z0-9_]+$/.test(valueName)) {
          this.addHint(
            enumValue,
            `Enum value '${valueName}' should be uppercase and can only contain underscores.`
          );
        }

        this.Variables.set(valueName, {
          name: valueName,
          const: false,
          used: false,
        });
      }
    } else {
      return this.visitChildren(ctx);
    }
  }

  visitFunction_call(ctx: Function_callContext): void {
    if (!this.isFirstPass) {
      const functionName = ctx.ID().text;

      if (
        !this.Functions.has(functionName) &&
        !this.CFunctions.has(functionName)
      ) {
        this.addError(ctx, `Function '${functionName}' is not defined.`);
        return;
      }

      const func =
        this.Functions.get(functionName) || this.CFunctions.get(functionName);

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

  visitMain_dec(ctx: any): void {
    if (!this.isFirstPass) {
      return this.visitChildren(ctx);
    }
  }

  visitInit_dec(ctx: any): void {
    if (!this.isFirstPass) {
      return this.visitChildren(ctx);
    }
  }

  visitCombo_dec(ctx: any): void {
    if (this.isFirstPass) {
      const comboName = ctx.ID().text;
      if (this.Combos.has(comboName)) {
        this.addError(ctx, `Combo '${comboName}' is already defined.`);
      }

      this.Combos.set(comboName, {
        name: comboName,
        const: true,
        used: false,
      });
    } else {
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
