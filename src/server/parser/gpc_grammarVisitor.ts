// Generated from src/antlr/gpc_grammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./gpc_grammarParser";
import { Global_statementContext } from "./gpc_grammarParser";
import { StatementContext } from "./gpc_grammarParser";
import { Import_statementContext } from "./gpc_grammarParser";
import { Combo_decContext } from "./gpc_grammarParser";
import { Break_statementContext } from "./gpc_grammarParser";
import { Continue_statementContext } from "./gpc_grammarParser";
import { Enum_decContext } from "./gpc_grammarParser";
import { Enum_valueContext } from "./gpc_grammarParser";
import { Assignment_statementContext } from "./gpc_grammarParser";
import { Expression_statementContext } from "./gpc_grammarParser";
import { Switch_statementContext } from "./gpc_grammarParser";
import { Case_blockContext } from "./gpc_grammarParser";
import { If_statementContext } from "./gpc_grammarParser";
import { Else_statementContext } from "./gpc_grammarParser";
import { While_statementContext } from "./gpc_grammarParser";
import { For_statementContext } from "./gpc_grammarParser";
import { For_initContext } from "./gpc_grammarParser";
import { For_updateContext } from "./gpc_grammarParser";
import { Do_while_statementContext } from "./gpc_grammarParser";
import { Return_statementContext } from "./gpc_grammarParser";
import { Init_decContext } from "./gpc_grammarParser";
import { Main_decContext } from "./gpc_grammarParser";
import { BlockContext } from "./gpc_grammarParser";
import { Function_decContext } from "./gpc_grammarParser";
import { Parameter_listContext } from "./gpc_grammarParser";
import { ParameterContext } from "./gpc_grammarParser";
import { Variable_decContext } from "./gpc_grammarParser";
import { Variable_declaratorContext } from "./gpc_grammarParser";
import { Array_decContext } from "./gpc_grammarParser";
import { Array_bodyContext } from "./gpc_grammarParser";
import { Array_rowContext } from "./gpc_grammarParser";
import { ExpressionContext } from "./gpc_grammarParser";
import { PrimaryExpressionContext } from "./gpc_grammarParser";
import { Function_callContext } from "./gpc_grammarParser";
import { ExpressionSuffixContext } from "./gpc_grammarParser";
import { AssignmentContext } from "./gpc_grammarParser";
import { TypesContext } from "./gpc_grammarParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `gpc_grammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface gpc_grammarVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `gpc_grammarParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.global_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobal_statement?: (ctx: Global_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.import_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_statement?: (ctx: Import_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.combo_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCombo_dec?: (ctx: Combo_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.break_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_statement?: (ctx: Break_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.continue_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinue_statement?: (ctx: Continue_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.enum_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_dec?: (ctx: Enum_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.enum_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_value?: (ctx: Enum_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_statement?: (ctx: Assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.expression_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_statement?: (ctx: Expression_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.switch_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_statement?: (ctx: Switch_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.case_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_block?: (ctx: Case_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_statement?: (ctx: If_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.else_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElse_statement?: (ctx: Else_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.while_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_statement?: (ctx: While_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.for_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_statement?: (ctx: For_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.for_init`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_init?: (ctx: For_initContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.for_update`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_update?: (ctx: For_updateContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.do_while_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDo_while_statement?: (ctx: Do_while_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.return_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturn_statement?: (ctx: Return_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.init_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_dec?: (ctx: Init_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.main_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMain_dec?: (ctx: Main_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.function_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_dec?: (ctx: Function_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_list?: (ctx: Parameter_listContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.variable_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_dec?: (ctx: Variable_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.variable_declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_declarator?: (ctx: Variable_declaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.array_dec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_dec?: (ctx: Array_decContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.array_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_body?: (ctx: Array_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.array_row`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_row?: (ctx: Array_rowContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.primaryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.expressionSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionSuffix?: (ctx: ExpressionSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `gpc_grammarParser.types`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypes?: (ctx: TypesContext) => Result;
}

