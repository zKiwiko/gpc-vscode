// Generated from src/antlr/gpc_grammar.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { gpc_grammarVisitor } from "./gpc_grammarVisitor";

export class gpc_grammarParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly T__22 = 23;
  public static readonly T__23 = 24;
  public static readonly T__24 = 25;
  public static readonly T__25 = 26;
  public static readonly T__26 = 27;
  public static readonly T__27 = 28;
  public static readonly T__28 = 29;
  public static readonly T__29 = 30;
  public static readonly T__30 = 31;
  public static readonly T__31 = 32;
  public static readonly T__32 = 33;
  public static readonly T__33 = 34;
  public static readonly T__34 = 35;
  public static readonly T__35 = 36;
  public static readonly T__36 = 37;
  public static readonly T__37 = 38;
  public static readonly T__38 = 39;
  public static readonly T__39 = 40;
  public static readonly T__40 = 41;
  public static readonly T__41 = 42;
  public static readonly T__42 = 43;
  public static readonly T__43 = 44;
  public static readonly T__44 = 45;
  public static readonly T__45 = 46;
  public static readonly T__46 = 47;
  public static readonly T__47 = 48;
  public static readonly T__48 = 49;
  public static readonly T__49 = 50;
  public static readonly T__50 = 51;
  public static readonly T__51 = 52;
  public static readonly T__52 = 53;
  public static readonly T__53 = 54;
  public static readonly T__54 = 55;
  public static readonly T__55 = 56;
  public static readonly T__56 = 57;
  public static readonly T__57 = 58;
  public static readonly T__58 = 59;
  public static readonly T__59 = 60;
  public static readonly T__60 = 61;
  public static readonly T__61 = 62;
  public static readonly T__62 = 63;
  public static readonly T__63 = 64;
  public static readonly T__64 = 65;
  public static readonly T__65 = 66;
  public static readonly T__66 = 67;
  public static readonly WHITESPACE = 68;
  public static readonly COMMENT = 69;
  public static readonly LINE_COMMENT = 70;
  public static readonly ID = 71;
  public static readonly NUMBER = 72;
  public static readonly STRING = 73;
  public static readonly BOOLEAN = 74;
  public static readonly RULE_program = 0;
  public static readonly RULE_global_statement = 1;
  public static readonly RULE_statement = 2;
  public static readonly RULE_import_statement = 3;
  public static readonly RULE_combo_dec = 4;
  public static readonly RULE_break_statement = 5;
  public static readonly RULE_continue_statement = 6;
  public static readonly RULE_enum_dec = 7;
  public static readonly RULE_enum_value = 8;
  public static readonly RULE_assignment_statement = 9;
  public static readonly RULE_expression_statement = 10;
  public static readonly RULE_switch_statement = 11;
  public static readonly RULE_case_block = 12;
  public static readonly RULE_if_statement = 13;
  public static readonly RULE_else_statement = 14;
  public static readonly RULE_while_statement = 15;
  public static readonly RULE_for_statement = 16;
  public static readonly RULE_for_init = 17;
  public static readonly RULE_for_update = 18;
  public static readonly RULE_do_while_statement = 19;
  public static readonly RULE_return_statement = 20;
  public static readonly RULE_init_dec = 21;
  public static readonly RULE_main_dec = 22;
  public static readonly RULE_block = 23;
  public static readonly RULE_function_dec = 24;
  public static readonly RULE_parameter_list = 25;
  public static readonly RULE_parameter = 26;
  public static readonly RULE_variable_dec = 27;
  public static readonly RULE_variable_declarator = 28;
  public static readonly RULE_array_dec = 29;
  public static readonly RULE_array_body = 30;
  public static readonly RULE_array_row = 31;
  public static readonly RULE_expression = 32;
  public static readonly RULE_primaryExpression = 33;
  public static readonly RULE_function_call = 34;
  public static readonly RULE_expressionSuffix = 35;
  public static readonly RULE_assignment = 36;
  public static readonly RULE_types = 37;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    "program",
    "global_statement",
    "statement",
    "import_statement",
    "combo_dec",
    "break_statement",
    "continue_statement",
    "enum_dec",
    "enum_value",
    "assignment_statement",
    "expression_statement",
    "switch_statement",
    "case_block",
    "if_statement",
    "else_statement",
    "while_statement",
    "for_statement",
    "for_init",
    "for_update",
    "do_while_statement",
    "return_statement",
    "init_dec",
    "main_dec",
    "block",
    "function_dec",
    "parameter_list",
    "parameter",
    "variable_dec",
    "variable_declarator",
    "array_dec",
    "array_body",
    "array_row",
    "expression",
    "primaryExpression",
    "function_call",
    "expressionSuffix",
    "assignment",
    "types",
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'use'",
    "'local'",
    "'::'",
    "';'",
    "'combo'",
    "'{'",
    "'}'",
    "'break'",
    "'continue'",
    "'enum'",
    "','",
    "'='",
    "'switch'",
    "'('",
    "')'",
    "'case'",
    "':'",
    "'default'",
    "'if'",
    "'else'",
    "'while'",
    "'for'",
    "'do'",
    "'return'",
    "'init'",
    "'main'",
    "'function'",
    "'int'",
    "'define'",
    "'['",
    "']'",
    "'const'",
    "'[]'",
    "'-'",
    "'!'",
    "'+'",
    "'*'",
    "'/'",
    "'%'",
    "'=='",
    "'!='",
    "'<'",
    "'>'",
    "'<='",
    "'>='",
    "'&&'",
    "'||'",
    "'|'",
    "'&'",
    "'^'",
    "'<<'",
    "'>>'",
    "'++'",
    "'--'",
    "'+='",
    "'-='",
    "'*='",
    "'/='",
    "'%='",
    "'int8'",
    "'int16'",
    "'int32'",
    "'uint8'",
    "'uint16'",
    "'uint32'",
    "'string'",
    "'image'",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "WHITESPACE",
    "COMMENT",
    "LINE_COMMENT",
    "ID",
    "NUMBER",
    "STRING",
    "BOOLEAN",
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    gpc_grammarParser._LITERAL_NAMES,
    gpc_grammarParser._SYMBOLIC_NAMES,
    [],
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return gpc_grammarParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return "gpc_grammar.g4";
  }

  // @Override
  public get ruleNames(): string[] {
    return gpc_grammarParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return gpc_grammarParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(gpc_grammarParser._ATN, this);
  }
  // @RuleVersion(0)
  public program(): ProgramContext {
    let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, gpc_grammarParser.RULE_program);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 79;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la - 1) & ~0x1f) === 0 &&
          ((1 << (_la - 1)) &
            ((1 << (gpc_grammarParser.T__0 - 1)) |
              (1 << (gpc_grammarParser.T__4 - 1)) |
              (1 << (gpc_grammarParser.T__9 - 1)) |
              (1 << (gpc_grammarParser.T__24 - 1)) |
              (1 << (gpc_grammarParser.T__25 - 1)) |
              (1 << (gpc_grammarParser.T__26 - 1)) |
              (1 << (gpc_grammarParser.T__27 - 1)) |
              (1 << (gpc_grammarParser.T__28 - 1)) |
              (1 << (gpc_grammarParser.T__31 - 1)))) !==
            0
        ) {
          {
            {
              this.state = 76;
              this.global_statement();
            }
          }
          this.state = 81;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 82;
        this.match(gpc_grammarParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public global_statement(): Global_statementContext {
    let _localctx: Global_statementContext = new Global_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 2, gpc_grammarParser.RULE_global_statement);
    try {
      this.state = 92;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case gpc_grammarParser.T__26:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 84;
            this.function_dec();
          }
          break;
        case gpc_grammarParser.T__27:
        case gpc_grammarParser.T__28:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 85;
            this.variable_dec();
          }
          break;
        case gpc_grammarParser.T__31:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 86;
            this.array_dec();
          }
          break;
        case gpc_grammarParser.T__25:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 87;
            this.main_dec();
          }
          break;
        case gpc_grammarParser.T__24:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 88;
            this.init_dec();
          }
          break;
        case gpc_grammarParser.T__9:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 89;
            this.enum_dec();
          }
          break;
        case gpc_grammarParser.T__4:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 90;
            this.combo_dec();
          }
          break;
        case gpc_grammarParser.T__0:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 91;
            this.import_statement();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    let _localctx: StatementContext = new StatementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 4, gpc_grammarParser.RULE_statement);
    try {
      this.state = 104;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 2, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 94;
            this.if_statement();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 95;
            this.while_statement();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 96;
            this.for_statement();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 97;
            this.do_while_statement();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 98;
            this.return_statement();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 99;
            this.assignment_statement();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 100;
            this.expression_statement();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 101;
            this.switch_statement();
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 102;
            this.break_statement();
          }
          break;

        case 10:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 103;
            this.continue_statement();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public import_statement(): Import_statementContext {
    let _localctx: Import_statementContext = new Import_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 6, gpc_grammarParser.RULE_import_statement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 106;
        this.match(gpc_grammarParser.T__0);
        this.state = 109;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === gpc_grammarParser.T__1) {
          {
            this.state = 107;
            this.match(gpc_grammarParser.T__1);
            this.state = 108;
            this.match(gpc_grammarParser.T__2);
          }
        }

        this.state = 111;
        this.match(gpc_grammarParser.ID);
        this.state = 116;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === gpc_grammarParser.T__2) {
          {
            {
              this.state = 112;
              this.match(gpc_grammarParser.T__2);
              this.state = 113;
              this.match(gpc_grammarParser.ID);
            }
          }
          this.state = 118;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 119;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public combo_dec(): Combo_decContext {
    let _localctx: Combo_decContext = new Combo_decContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 8, gpc_grammarParser.RULE_combo_dec);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 121;
        this.match(gpc_grammarParser.T__4);
        this.state = 122;
        this.match(gpc_grammarParser.ID);
        this.state = 123;
        this.match(gpc_grammarParser.T__5);
        this.state = 124;
        this.block();
        this.state = 125;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public break_statement(): Break_statementContext {
    let _localctx: Break_statementContext = new Break_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 10, gpc_grammarParser.RULE_break_statement);
    try {
      this.state = 133;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 127;
            this.match(gpc_grammarParser.T__7);
            this.state = 128;
            this.match(gpc_grammarParser.T__3);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 129;
            this.match(gpc_grammarParser.T__7);
            this.state = 130;
            this.expression();
            this.state = 131;
            this.match(gpc_grammarParser.T__3);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public continue_statement(): Continue_statementContext {
    let _localctx: Continue_statementContext = new Continue_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 12, gpc_grammarParser.RULE_continue_statement);
    try {
      this.state = 141;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 135;
            this.match(gpc_grammarParser.T__8);
            this.state = 136;
            this.match(gpc_grammarParser.T__3);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 137;
            this.match(gpc_grammarParser.T__8);
            this.state = 138;
            this.expression();
            this.state = 139;
            this.match(gpc_grammarParser.T__3);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enum_dec(): Enum_decContext {
    let _localctx: Enum_decContext = new Enum_decContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, gpc_grammarParser.RULE_enum_dec);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 143;
        this.match(gpc_grammarParser.T__9);
        this.state = 144;
        this.match(gpc_grammarParser.T__5);
        this.state = 145;
        this.enum_value();
        this.state = 150;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 146;
                this.match(gpc_grammarParser.T__10);
                this.state = 147;
                this.enum_value();
              }
            }
          }
          this.state = 152;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        }
        this.state = 154;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === gpc_grammarParser.T__10) {
          {
            this.state = 153;
            this.match(gpc_grammarParser.T__10);
          }
        }

        this.state = 156;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enum_value(): Enum_valueContext {
    let _localctx: Enum_valueContext = new Enum_valueContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 16, gpc_grammarParser.RULE_enum_value);
    try {
      this.state = 162;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 158;
            this.match(gpc_grammarParser.ID);
            this.state = 159;
            this.match(gpc_grammarParser.T__11);
            this.state = 160;
            this.expression();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 161;
            this.match(gpc_grammarParser.ID);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignment_statement(): Assignment_statementContext {
    let _localctx: Assignment_statementContext =
      new Assignment_statementContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, gpc_grammarParser.RULE_assignment_statement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 164;
        this.assignment();
        this.state = 165;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expression_statement(): Expression_statementContext {
    let _localctx: Expression_statementContext =
      new Expression_statementContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, gpc_grammarParser.RULE_expression_statement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 167;
        this.expression();
        this.state = 168;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public switch_statement(): Switch_statementContext {
    let _localctx: Switch_statementContext = new Switch_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 22, gpc_grammarParser.RULE_switch_statement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 170;
        this.match(gpc_grammarParser.T__12);
        this.state = 171;
        this.match(gpc_grammarParser.T__13);
        this.state = 172;
        this.expression();
        this.state = 173;
        this.match(gpc_grammarParser.T__14);
        this.state = 174;
        this.match(gpc_grammarParser.T__5);
        this.state = 178;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          _la === gpc_grammarParser.T__15 ||
          _la === gpc_grammarParser.T__17
        ) {
          {
            {
              this.state = 175;
              this.case_block();
            }
          }
          this.state = 180;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 181;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public case_block(): Case_blockContext {
    let _localctx: Case_blockContext = new Case_blockContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 24, gpc_grammarParser.RULE_case_block);
    try {
      this.state = 195;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case gpc_grammarParser.T__15:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 183;
            this.match(gpc_grammarParser.T__15);
            this.state = 184;
            this.expression();
            this.state = 185;
            this.match(gpc_grammarParser.T__16);
            this.state = 186;
            this.match(gpc_grammarParser.T__5);
            this.state = 187;
            this.block();
            this.state = 188;
            this.match(gpc_grammarParser.T__6);
          }
          break;
        case gpc_grammarParser.T__17:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 190;
            this.match(gpc_grammarParser.T__17);
            this.state = 191;
            this.match(gpc_grammarParser.T__5);
            this.state = 192;
            this.block();
            this.state = 193;
            this.match(gpc_grammarParser.T__6);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public if_statement(): If_statementContext {
    let _localctx: If_statementContext = new If_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 26, gpc_grammarParser.RULE_if_statement);
    try {
      this.state = 215;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 14, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 197;
            this.match(gpc_grammarParser.T__18);
            this.state = 198;
            this.match(gpc_grammarParser.T__13);
            this.state = 199;
            this.expression();
            this.state = 200;
            this.match(gpc_grammarParser.T__14);
            this.state = 201;
            this.match(gpc_grammarParser.T__5);
            this.state = 202;
            this.block();
            this.state = 203;
            this.match(gpc_grammarParser.T__6);
            this.state = 205;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 12, this._ctx)
            ) {
              case 1:
                {
                  this.state = 204;
                  this.else_statement();
                }
                break;
            }
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 207;
            this.match(gpc_grammarParser.T__18);
            this.state = 208;
            this.match(gpc_grammarParser.T__13);
            this.state = 209;
            this.expression();
            this.state = 210;
            this.match(gpc_grammarParser.T__14);
            this.state = 211;
            this.block();
            this.state = 213;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 13, this._ctx)
            ) {
              case 1:
                {
                  this.state = 212;
                  this.else_statement();
                }
                break;
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public else_statement(): Else_statementContext {
    let _localctx: Else_statementContext = new Else_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 28, gpc_grammarParser.RULE_else_statement);
    try {
      this.state = 224;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 217;
            this.match(gpc_grammarParser.T__19);
            this.state = 218;
            this.match(gpc_grammarParser.T__5);
            this.state = 219;
            this.block();
            this.state = 220;
            this.match(gpc_grammarParser.T__6);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 222;
            this.match(gpc_grammarParser.T__19);
            this.state = 223;
            this.if_statement();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public while_statement(): While_statementContext {
    let _localctx: While_statementContext = new While_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 30, gpc_grammarParser.RULE_while_statement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 226;
        this.match(gpc_grammarParser.T__20);
        this.state = 227;
        this.match(gpc_grammarParser.T__13);
        this.state = 228;
        this.expression();
        this.state = 229;
        this.match(gpc_grammarParser.T__14);
        this.state = 230;
        this.match(gpc_grammarParser.T__5);
        this.state = 231;
        this.block();
        this.state = 232;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public for_statement(): For_statementContext {
    let _localctx: For_statementContext = new For_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 32, gpc_grammarParser.RULE_for_statement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 234;
        this.match(gpc_grammarParser.T__21);
        this.state = 235;
        this.match(gpc_grammarParser.T__13);
        this.state = 237;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 14) & ~0x1f) === 0 &&
            ((1 << (_la - 14)) &
              ((1 << (gpc_grammarParser.T__13 - 14)) |
                (1 << (gpc_grammarParser.T__33 - 14)) |
                (1 << (gpc_grammarParser.T__34 - 14)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 236;
            this.for_init();
          }
        }

        this.state = 239;
        this.match(gpc_grammarParser.T__3);
        this.state = 241;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 14) & ~0x1f) === 0 &&
            ((1 << (_la - 14)) &
              ((1 << (gpc_grammarParser.T__13 - 14)) |
                (1 << (gpc_grammarParser.T__33 - 14)) |
                (1 << (gpc_grammarParser.T__34 - 14)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 240;
            this.expression();
          }
        }

        this.state = 243;
        this.match(gpc_grammarParser.T__3);
        this.state = 245;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 14) & ~0x1f) === 0 &&
            ((1 << (_la - 14)) &
              ((1 << (gpc_grammarParser.T__13 - 14)) |
                (1 << (gpc_grammarParser.T__33 - 14)) |
                (1 << (gpc_grammarParser.T__34 - 14)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 244;
            this.for_update();
          }
        }

        this.state = 247;
        this.match(gpc_grammarParser.T__14);
        this.state = 248;
        this.match(gpc_grammarParser.T__5);
        this.state = 249;
        this.block();
        this.state = 250;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public for_init(): For_initContext {
    let _localctx: For_initContext = new For_initContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, gpc_grammarParser.RULE_for_init);
    let _la: number;
    try {
      this.state = 268;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 252;
            this.assignment();
            this.state = 257;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 253;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 254;
                  this.assignment();
                }
              }
              this.state = 259;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 260;
            this.expression();
            this.state = 265;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 261;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 262;
                  this.expression();
                }
              }
              this.state = 267;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public for_update(): For_updateContext {
    let _localctx: For_updateContext = new For_updateContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 36, gpc_grammarParser.RULE_for_update);
    let _la: number;
    try {
      this.state = 286;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 270;
            this.assignment();
            this.state = 275;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 271;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 272;
                  this.assignment();
                }
              }
              this.state = 277;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 278;
            this.expression();
            this.state = 283;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 279;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 280;
                  this.expression();
                }
              }
              this.state = 285;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public do_while_statement(): Do_while_statementContext {
    let _localctx: Do_while_statementContext = new Do_while_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 38, gpc_grammarParser.RULE_do_while_statement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 288;
        this.match(gpc_grammarParser.T__22);
        this.state = 289;
        this.match(gpc_grammarParser.T__5);
        this.state = 290;
        this.block();
        this.state = 291;
        this.match(gpc_grammarParser.T__6);
        this.state = 292;
        this.match(gpc_grammarParser.T__20);
        this.state = 293;
        this.match(gpc_grammarParser.T__13);
        this.state = 294;
        this.expression();
        this.state = 295;
        this.match(gpc_grammarParser.T__14);
        this.state = 296;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public return_statement(): Return_statementContext {
    let _localctx: Return_statementContext = new Return_statementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 40, gpc_grammarParser.RULE_return_statement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 298;
        this.match(gpc_grammarParser.T__23);
        this.state = 300;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 14) & ~0x1f) === 0 &&
            ((1 << (_la - 14)) &
              ((1 << (gpc_grammarParser.T__13 - 14)) |
                (1 << (gpc_grammarParser.T__33 - 14)) |
                (1 << (gpc_grammarParser.T__34 - 14)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 299;
            this.expression();
          }
        }

        this.state = 302;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public init_dec(): Init_decContext {
    let _localctx: Init_decContext = new Init_decContext(this._ctx, this.state);
    this.enterRule(_localctx, 42, gpc_grammarParser.RULE_init_dec);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 304;
        this.match(gpc_grammarParser.T__24);
        this.state = 305;
        this.match(gpc_grammarParser.T__5);
        this.state = 306;
        this.block();
        this.state = 307;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public main_dec(): Main_decContext {
    let _localctx: Main_decContext = new Main_decContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, gpc_grammarParser.RULE_main_dec);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 309;
        this.match(gpc_grammarParser.T__25);
        this.state = 310;
        this.match(gpc_grammarParser.T__5);
        this.state = 311;
        this.block();
        this.state = 312;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public block(): BlockContext {
    let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
    this.enterRule(_localctx, 46, gpc_grammarParser.RULE_block);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 317;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 314;
                this.statement();
              }
            }
          }
          this.state = 319;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public function_dec(): Function_decContext {
    let _localctx: Function_decContext = new Function_decContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 48, gpc_grammarParser.RULE_function_dec);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 320;
        this.match(gpc_grammarParser.T__26);
        this.state = 321;
        this.match(gpc_grammarParser.ID);
        this.state = 322;
        this.match(gpc_grammarParser.T__13);
        this.state = 324;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === gpc_grammarParser.T__27 ||
          (((_la - 60) & ~0x1f) === 0 &&
            ((1 << (_la - 60)) &
              ((1 << (gpc_grammarParser.T__59 - 60)) |
                (1 << (gpc_grammarParser.T__60 - 60)) |
                (1 << (gpc_grammarParser.T__61 - 60)) |
                (1 << (gpc_grammarParser.T__62 - 60)) |
                (1 << (gpc_grammarParser.T__63 - 60)) |
                (1 << (gpc_grammarParser.T__64 - 60)) |
                (1 << (gpc_grammarParser.T__65 - 60)) |
                (1 << (gpc_grammarParser.T__66 - 60)) |
                (1 << (gpc_grammarParser.ID - 60)))) !==
              0)
        ) {
          {
            this.state = 323;
            this.parameter_list();
          }
        }

        this.state = 326;
        this.match(gpc_grammarParser.T__14);
        this.state = 327;
        this.match(gpc_grammarParser.T__5);
        this.state = 328;
        this.block();
        this.state = 329;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameter_list(): Parameter_listContext {
    let _localctx: Parameter_listContext = new Parameter_listContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 50, gpc_grammarParser.RULE_parameter_list);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 331;
        this.parameter();
        this.state = 336;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === gpc_grammarParser.T__10) {
          {
            {
              this.state = 332;
              this.match(gpc_grammarParser.T__10);
              this.state = 333;
              this.parameter();
            }
          }
          this.state = 338;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameter(): ParameterContext {
    let _localctx: ParameterContext = new ParameterContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 52, gpc_grammarParser.RULE_parameter);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 340;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === gpc_grammarParser.T__27 ||
          (((_la - 60) & ~0x1f) === 0 &&
            ((1 << (_la - 60)) &
              ((1 << (gpc_grammarParser.T__59 - 60)) |
                (1 << (gpc_grammarParser.T__60 - 60)) |
                (1 << (gpc_grammarParser.T__61 - 60)) |
                (1 << (gpc_grammarParser.T__62 - 60)) |
                (1 << (gpc_grammarParser.T__63 - 60)) |
                (1 << (gpc_grammarParser.T__64 - 60)) |
                (1 << (gpc_grammarParser.T__65 - 60)) |
                (1 << (gpc_grammarParser.T__66 - 60)))) !==
              0)
        ) {
          {
            this.state = 339;
            this.types();
          }
        }

        this.state = 342;
        this.match(gpc_grammarParser.ID);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public variable_dec(): Variable_decContext {
    let _localctx: Variable_decContext = new Variable_decContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 54, gpc_grammarParser.RULE_variable_dec);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 344;
        _la = this._input.LA(1);
        if (
          !(_la === gpc_grammarParser.T__27 || _la === gpc_grammarParser.T__28)
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 345;
        this.variable_declarator();
        this.state = 350;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === gpc_grammarParser.T__10) {
          {
            {
              this.state = 346;
              this.match(gpc_grammarParser.T__10);
              this.state = 347;
              this.variable_declarator();
            }
          }
          this.state = 352;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 353;
        this.match(gpc_grammarParser.T__3);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public variable_declarator(): Variable_declaratorContext {
    let _localctx: Variable_declaratorContext = new Variable_declaratorContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 56, gpc_grammarParser.RULE_variable_declarator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 355;
        this.match(gpc_grammarParser.ID);
        this.state = 360;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === gpc_grammarParser.T__29) {
          {
            this.state = 356;
            this.match(gpc_grammarParser.T__29);
            this.state = 357;
            this.expression();
            this.state = 358;
            this.match(gpc_grammarParser.T__30);
          }
        }

        this.state = 364;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === gpc_grammarParser.T__11) {
          {
            this.state = 362;
            this.match(gpc_grammarParser.T__11);
            this.state = 363;
            this.expression();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public array_dec(): Array_decContext {
    let _localctx: Array_decContext = new Array_decContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 58, gpc_grammarParser.RULE_array_dec);
    let _la: number;
    try {
      this.state = 399;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 36, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 366;
            this.match(gpc_grammarParser.T__31);
            this.state = 367;
            this.types();
            this.state = 368;
            this.match(gpc_grammarParser.ID);
            {
              this.state = 369;
              this.match(gpc_grammarParser.T__32);
              this.state = 371;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === gpc_grammarParser.T__32) {
                {
                  this.state = 370;
                  this.match(gpc_grammarParser.T__32);
                }
              }
            }
            this.state = 373;
            this.match(gpc_grammarParser.T__11);
            this.state = 374;
            this.array_body();
            this.state = 375;
            this.match(gpc_grammarParser.T__3);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 377;
            this.match(gpc_grammarParser.T__31);
            this.state = 378;
            this.types();
            this.state = 379;
            this.match(gpc_grammarParser.ID);
            this.state = 386;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === gpc_grammarParser.T__29) {
              {
                this.state = 380;
                this.match(gpc_grammarParser.T__29);
                this.state = 381;
                this.match(gpc_grammarParser.T__30);
                this.state = 384;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === gpc_grammarParser.T__29) {
                  {
                    this.state = 382;
                    this.match(gpc_grammarParser.T__29);
                    this.state = 383;
                    this.match(gpc_grammarParser.T__30);
                  }
                }
              }
            }

            this.state = 388;
            this.match(gpc_grammarParser.T__11);
            this.state = 389;
            this.array_body();
            this.state = 390;
            this.match(gpc_grammarParser.T__3);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 392;
            this.match(gpc_grammarParser.T__31);
            this.state = 393;
            this.types();
            this.state = 394;
            this.match(gpc_grammarParser.ID);
            this.state = 395;
            this.match(gpc_grammarParser.T__11);
            this.state = 396;
            this.expression();
            this.state = 397;
            this.match(gpc_grammarParser.T__3);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public array_body(): Array_bodyContext {
    let _localctx: Array_bodyContext = new Array_bodyContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 60, gpc_grammarParser.RULE_array_body);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 401;
        this.match(gpc_grammarParser.T__5);
        this.state = 410;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 6) & ~0x1f) === 0 &&
            ((1 << (_la - 6)) &
              ((1 << (gpc_grammarParser.T__5 - 6)) |
                (1 << (gpc_grammarParser.T__13 - 6)) |
                (1 << (gpc_grammarParser.T__33 - 6)) |
                (1 << (gpc_grammarParser.T__34 - 6)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 402;
            this.array_row();
            this.state = 407;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 403;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 404;
                  this.array_row();
                }
              }
              this.state = 409;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
        }

        this.state = 412;
        this.match(gpc_grammarParser.T__6);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public array_row(): Array_rowContext {
    let _localctx: Array_rowContext = new Array_rowContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 62, gpc_grammarParser.RULE_array_row);
    let _la: number;
    try {
      this.state = 427;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case gpc_grammarParser.T__13:
        case gpc_grammarParser.T__33:
        case gpc_grammarParser.T__34:
        case gpc_grammarParser.T__52:
        case gpc_grammarParser.T__53:
        case gpc_grammarParser.ID:
        case gpc_grammarParser.NUMBER:
        case gpc_grammarParser.STRING:
        case gpc_grammarParser.BOOLEAN:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 414;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__5:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 415;
            this.match(gpc_grammarParser.T__5);
            this.state = 424;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (((_la - 14) & ~0x1f) === 0 &&
                ((1 << (_la - 14)) &
                  ((1 << (gpc_grammarParser.T__13 - 14)) |
                    (1 << (gpc_grammarParser.T__33 - 14)) |
                    (1 << (gpc_grammarParser.T__34 - 14)))) !==
                  0) ||
              (((_la - 53) & ~0x1f) === 0 &&
                ((1 << (_la - 53)) &
                  ((1 << (gpc_grammarParser.T__52 - 53)) |
                    (1 << (gpc_grammarParser.T__53 - 53)) |
                    (1 << (gpc_grammarParser.ID - 53)) |
                    (1 << (gpc_grammarParser.NUMBER - 53)) |
                    (1 << (gpc_grammarParser.STRING - 53)) |
                    (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
                  0)
            ) {
              {
                this.state = 416;
                this.expression();
                this.state = 421;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === gpc_grammarParser.T__10) {
                  {
                    {
                      this.state = 417;
                      this.match(gpc_grammarParser.T__10);
                      this.state = 418;
                      this.expression();
                    }
                  }
                  this.state = 423;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
              }
            }

            this.state = 426;
            this.match(gpc_grammarParser.T__6);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expression(): ExpressionContext {
    let _localctx: ExpressionContext = new ExpressionContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 64, gpc_grammarParser.RULE_expression);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 429;
        this.primaryExpression();
        this.state = 433;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 430;
                this.expressionSuffix();
              }
            }
          }
          this.state = 435;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public primaryExpression(): PrimaryExpressionContext {
    let _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 66, gpc_grammarParser.RULE_primaryExpression);
    try {
      this.state = 450;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 43, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 436;
            this.match(gpc_grammarParser.ID);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 437;
            this.match(gpc_grammarParser.NUMBER);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 438;
            this.match(gpc_grammarParser.STRING);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 439;
            this.match(gpc_grammarParser.BOOLEAN);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 440;
            this.function_call();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 441;
            this.assignment();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 442;
            this.match(gpc_grammarParser.T__33);
            this.state = 443;
            this.expression();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 444;
            this.match(gpc_grammarParser.T__13);
            this.state = 445;
            this.expression();
            this.state = 446;
            this.match(gpc_grammarParser.T__14);
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 448;
            this.match(gpc_grammarParser.T__34);
            this.state = 449;
            this.expression();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public function_call(): Function_callContext {
    let _localctx: Function_callContext = new Function_callContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 68, gpc_grammarParser.RULE_function_call);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 452;
        this.match(gpc_grammarParser.ID);
        this.state = 453;
        this.match(gpc_grammarParser.T__13);
        this.state = 462;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 14) & ~0x1f) === 0 &&
            ((1 << (_la - 14)) &
              ((1 << (gpc_grammarParser.T__13 - 14)) |
                (1 << (gpc_grammarParser.T__33 - 14)) |
                (1 << (gpc_grammarParser.T__34 - 14)))) !==
              0) ||
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (gpc_grammarParser.T__52 - 53)) |
                (1 << (gpc_grammarParser.T__53 - 53)) |
                (1 << (gpc_grammarParser.ID - 53)) |
                (1 << (gpc_grammarParser.NUMBER - 53)) |
                (1 << (gpc_grammarParser.STRING - 53)) |
                (1 << (gpc_grammarParser.BOOLEAN - 53)))) !==
              0)
        ) {
          {
            this.state = 454;
            this.expression();
            this.state = 459;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === gpc_grammarParser.T__10) {
              {
                {
                  this.state = 455;
                  this.match(gpc_grammarParser.T__10);
                  this.state = 456;
                  this.expression();
                }
              }
              this.state = 461;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
          }
        }

        this.state = 464;
        this.match(gpc_grammarParser.T__14);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionSuffix(): ExpressionSuffixContext {
    let _localctx: ExpressionSuffixContext = new ExpressionSuffixContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 70, gpc_grammarParser.RULE_expressionSuffix);
    let _la: number;
    try {
      this.state = 486;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case gpc_grammarParser.T__29:
          this.enterOuterAlt(_localctx, 1);
          {
            {
              this.state = 466;
              this.match(gpc_grammarParser.T__29);
              this.state = 467;
              this.expression();
              this.state = 468;
              this.match(gpc_grammarParser.T__30);
              this.state = 473;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 46, this._ctx)
              ) {
                case 1:
                  {
                    this.state = 469;
                    this.match(gpc_grammarParser.T__29);
                    this.state = 470;
                    this.expression();
                    this.state = 471;
                    this.match(gpc_grammarParser.T__30);
                  }
                  break;
              }
            }
          }
          break;
        case gpc_grammarParser.T__33:
        case gpc_grammarParser.T__35:
        case gpc_grammarParser.T__36:
        case gpc_grammarParser.T__37:
        case gpc_grammarParser.T__38:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 475;
            _la = this._input.LA(1);
            if (
              !(
                ((_la - 34) & ~0x1f) === 0 &&
                ((1 << (_la - 34)) &
                  ((1 << (gpc_grammarParser.T__33 - 34)) |
                    (1 << (gpc_grammarParser.T__35 - 34)) |
                    (1 << (gpc_grammarParser.T__36 - 34)) |
                    (1 << (gpc_grammarParser.T__37 - 34)) |
                    (1 << (gpc_grammarParser.T__38 - 34)))) !==
                  0
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 476;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__39:
        case gpc_grammarParser.T__40:
        case gpc_grammarParser.T__41:
        case gpc_grammarParser.T__42:
        case gpc_grammarParser.T__43:
        case gpc_grammarParser.T__44:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 477;
            _la = this._input.LA(1);
            if (
              !(
                ((_la - 40) & ~0x1f) === 0 &&
                ((1 << (_la - 40)) &
                  ((1 << (gpc_grammarParser.T__39 - 40)) |
                    (1 << (gpc_grammarParser.T__40 - 40)) |
                    (1 << (gpc_grammarParser.T__41 - 40)) |
                    (1 << (gpc_grammarParser.T__42 - 40)) |
                    (1 << (gpc_grammarParser.T__43 - 40)) |
                    (1 << (gpc_grammarParser.T__44 - 40)))) !==
                  0
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 478;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__45:
        case gpc_grammarParser.T__46:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 479;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__45 ||
                _la === gpc_grammarParser.T__46
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 480;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__47:
        case gpc_grammarParser.T__48:
        case gpc_grammarParser.T__49:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 481;
            _la = this._input.LA(1);
            if (
              !(
                ((_la - 48) & ~0x1f) === 0 &&
                ((1 << (_la - 48)) &
                  ((1 << (gpc_grammarParser.T__47 - 48)) |
                    (1 << (gpc_grammarParser.T__48 - 48)) |
                    (1 << (gpc_grammarParser.T__49 - 48)))) !==
                  0
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 482;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__50:
        case gpc_grammarParser.T__51:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 483;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__50 ||
                _la === gpc_grammarParser.T__51
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 484;
            this.expression();
          }
          break;
        case gpc_grammarParser.T__52:
        case gpc_grammarParser.T__53:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 485;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__52 ||
                _la === gpc_grammarParser.T__53
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignment(): AssignmentContext {
    let _localctx: AssignmentContext = new AssignmentContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 72, gpc_grammarParser.RULE_assignment);
    let _la: number;
    try {
      this.state = 506;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 50, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 488;
            this.match(gpc_grammarParser.ID);
            this.state = 498;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === gpc_grammarParser.T__29) {
              {
                this.state = 489;
                this.match(gpc_grammarParser.T__29);
                this.state = 490;
                this.expression();
                this.state = 491;
                this.match(gpc_grammarParser.T__30);
                this.state = 496;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === gpc_grammarParser.T__29) {
                  {
                    this.state = 492;
                    this.match(gpc_grammarParser.T__29);
                    this.state = 493;
                    this.expression();
                    this.state = 494;
                    this.match(gpc_grammarParser.T__30);
                  }
                }
              }
            }

            this.state = 500;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__11 ||
                (((_la - 55) & ~0x1f) === 0 &&
                  ((1 << (_la - 55)) &
                    ((1 << (gpc_grammarParser.T__54 - 55)) |
                      (1 << (gpc_grammarParser.T__55 - 55)) |
                      (1 << (gpc_grammarParser.T__56 - 55)) |
                      (1 << (gpc_grammarParser.T__57 - 55)) |
                      (1 << (gpc_grammarParser.T__58 - 55)))) !==
                    0)
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 501;
            this.expression();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 502;
            this.match(gpc_grammarParser.ID);
            this.state = 503;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__52 ||
                _la === gpc_grammarParser.T__53
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 504;
            _la = this._input.LA(1);
            if (
              !(
                _la === gpc_grammarParser.T__52 ||
                _la === gpc_grammarParser.T__53
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 505;
            this.match(gpc_grammarParser.ID);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public types(): TypesContext {
    let _localctx: TypesContext = new TypesContext(this._ctx, this.state);
    this.enterRule(_localctx, 74, gpc_grammarParser.RULE_types);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 508;
        _la = this._input.LA(1);
        if (
          !(
            _la === gpc_grammarParser.T__27 ||
            (((_la - 60) & ~0x1f) === 0 &&
              ((1 << (_la - 60)) &
                ((1 << (gpc_grammarParser.T__59 - 60)) |
                  (1 << (gpc_grammarParser.T__60 - 60)) |
                  (1 << (gpc_grammarParser.T__61 - 60)) |
                  (1 << (gpc_grammarParser.T__62 - 60)) |
                  (1 << (gpc_grammarParser.T__63 - 60)) |
                  (1 << (gpc_grammarParser.T__64 - 60)) |
                  (1 << (gpc_grammarParser.T__65 - 60)) |
                  (1 << (gpc_grammarParser.T__66 - 60)))) !==
                0)
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public static readonly _serializedATN: string =
    "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03L\u0201\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
    "\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
    "\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x03\x02\x07\x02P\n\x02\f\x02\x0E" +
    "\x02S\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
    "\x03\x03\x03\x03\x03\x05\x03_\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
    "\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04k\n\x04\x03\x05\x03" +
    "\x05\x03\x05\x05\x05p\n\x05\x03\x05\x03\x05\x03\x05\x07\x05u\n\x05\f\x05" +
    "\x0E\x05x\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
    "\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07\x88\n" +
    "\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\x90\n\b\x03\t\x03\t\x03" +
    "\t\x03\t\x03\t\x07\t\x97\n\t\f\t\x0E\t\x9A\v\t\x03\t\x05\t\x9D\n\t\x03" +
    "\t\x03\t\x03\n\x03\n\x03\n\x03\n\x05\n\xA5\n\n\x03\v\x03\v\x03\v\x03\f" +
    "\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\xB3\n\r\f\r\x0E" +
    "\r\xB6\v\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
    "\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xC6\n\x0E\x03" +
    "\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xD0" +
    "\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xD8\n\x0F" +
    "\x05\x0F\xDA\n\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
    "\x10\x05\x10\xE3\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x05\x12\xF0\n\x12\x03\x12\x03" +
    "\x12\x05\x12\xF4\n\x12\x03\x12\x03\x12\x05\x12\xF8\n\x12\x03\x12\x03\x12" +
    "\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x07\x13\u0102\n\x13\f" +
    "\x13\x0E\x13\u0105\v\x13\x03\x13\x03\x13\x03\x13\x07\x13\u010A\n\x13\f" +
    "\x13\x0E\x13\u010D\v\x13\x05\x13\u010F\n\x13\x03\x14\x03\x14\x03\x14\x07" +
    "\x14\u0114\n\x14\f\x14\x0E\x14\u0117\v\x14\x03\x14\x03\x14\x03\x14\x07" +
    "\x14\u011C\n\x14\f\x14\x0E\x14\u011F\v\x14\x05\x14\u0121\n\x14\x03\x15" +
    "\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15" +
    "\x03\x16\x03\x16\x05\x16\u012F\n\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03" +
    "\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x07" +
    "\x19\u013E\n\x19\f\x19\x0E\x19\u0141\v\x19\x03\x1A\x03\x1A\x03\x1A\x03" +
    "\x1A\x05\x1A\u0147\n\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B" +
    "\x03\x1B\x03\x1B\x07\x1B\u0151\n\x1B\f\x1B\x0E\x1B\u0154\v\x1B\x03\x1C" +
    "\x05\x1C\u0157\n\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07" +
    "\x1D\u015F\n\x1D\f\x1D\x0E\x1D\u0162\v\x1D\x03\x1D\x03\x1D\x03\x1E\x03" +
    "\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u016B\n\x1E\x03\x1E\x03\x1E\x05\x1E" +
    "\u016F\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0176\n\x1F" +
    "\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
    "\x03\x1F\x03\x1F\x05\x1F\u0183\n\x1F\x05\x1F\u0185\n\x1F\x03\x1F\x03\x1F" +
    "\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F" +
    "\x05\x1F\u0192\n\x1F\x03 \x03 \x03 \x03 \x07 \u0198\n \f \x0E \u019B\v" +
    " \x05 \u019D\n \x03 \x03 \x03!\x03!\x03!\x03!\x03!\x07!\u01A6\n!\f!\x0E" +
    '!\u01A9\v!\x05!\u01AB\n!\x03!\x05!\u01AE\n!\x03"\x03"\x07"\u01B2\n' +
    '"\f"\x0E"\u01B5\v"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03' +
    "#\x03#\x03#\x03#\x03#\x05#\u01C5\n#\x03$\x03$\x03$\x03$\x03$\x07$\u01CC" +
    "\n$\f$\x0E$\u01CF\v$\x05$\u01D1\n$\x03$\x03$\x03%\x03%\x03%\x03%\x03%" +
    "\x03%\x03%\x05%\u01DC\n%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%" +
    "\x03%\x03%\x05%\u01E9\n%\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x05&" +
    "\u01F3\n&\x05&\u01F5\n&\x03&\x03&\x03&\x03&\x03&\x03&\x05&\u01FD\n&\x03" +
    "\'\x03\'\x03\'\x02\x02\x02(\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
    "\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
    ' \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02' +
    "<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02\x02\v\x03\x02\x1E\x1F\x04" +
    "\x02$$&)\x03\x02*/\x03\x0201\x03\x0224\x03\x0256\x03\x0278\x04\x02\x0E" +
    "\x0E9=\x04\x02\x1E\x1E>E\x02\u0229\x02Q\x03\x02\x02\x02\x04^\x03\x02\x02" +
    "\x02\x06j\x03\x02\x02\x02\bl\x03\x02\x02\x02\n{\x03\x02\x02\x02\f\x87" +
    "\x03\x02\x02\x02\x0E\x8F\x03\x02\x02\x02\x10\x91\x03\x02\x02\x02\x12\xA4" +
    "\x03\x02\x02\x02\x14\xA6\x03\x02\x02\x02\x16\xA9\x03\x02\x02\x02\x18\xAC" +
    "\x03\x02\x02\x02\x1A\xC5\x03\x02\x02\x02\x1C\xD9\x03\x02\x02\x02\x1E\xE2" +
    '\x03\x02\x02\x02 \xE4\x03\x02\x02\x02"\xEC\x03\x02\x02\x02$\u010E\x03' +
    "\x02\x02\x02&\u0120\x03\x02\x02\x02(\u0122\x03\x02\x02\x02*\u012C\x03" +
    "\x02\x02\x02,\u0132\x03\x02\x02\x02.\u0137\x03\x02\x02\x020\u013F\x03" +
    "\x02\x02\x022\u0142\x03\x02\x02\x024\u014D\x03\x02\x02\x026\u0156\x03" +
    "\x02\x02\x028\u015A\x03\x02\x02\x02:\u0165\x03\x02\x02\x02<\u0191\x03" +
    "\x02\x02\x02>\u0193\x03\x02\x02\x02@\u01AD\x03\x02\x02\x02B\u01AF\x03" +
    "\x02\x02\x02D\u01C4\x03\x02\x02\x02F\u01C6\x03\x02\x02\x02H\u01E8\x03" +
    "\x02\x02\x02J\u01FC\x03\x02\x02\x02L\u01FE\x03\x02\x02\x02NP\x05\x04\x03" +
    "\x02ON\x03\x02\x02\x02PS\x03\x02\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02" +
    "\x02RT\x03\x02\x02\x02SQ\x03\x02\x02\x02TU\x07\x02\x02\x03U\x03\x03\x02" +
    "\x02\x02V_\x052\x1A\x02W_\x058\x1D\x02X_\x05<\x1F\x02Y_\x05.\x18\x02Z" +
    "_\x05,\x17\x02[_\x05\x10\t\x02\\_\x05\n\x06\x02]_\x05\b\x05\x02^V\x03" +
    "\x02\x02\x02^W\x03\x02\x02\x02^X\x03\x02\x02\x02^Y\x03\x02\x02\x02^Z\x03" +
    "\x02\x02\x02^[\x03\x02\x02\x02^\\\x03\x02\x02\x02^]\x03\x02\x02\x02_\x05" +
    '\x03\x02\x02\x02`k\x05\x1C\x0F\x02ak\x05 \x11\x02bk\x05"\x12\x02ck\x05' +
    "(\x15\x02dk\x05*\x16\x02ek\x05\x14\v\x02fk\x05\x16\f\x02gk\x05\x18\r\x02" +
    "hk\x05\f\x07\x02ik\x05\x0E\b\x02j`\x03\x02\x02\x02ja\x03\x02\x02\x02j" +
    "b\x03\x02\x02\x02jc\x03\x02\x02\x02jd\x03\x02\x02\x02je\x03\x02\x02\x02" +
    "jf\x03\x02\x02\x02jg\x03\x02\x02\x02jh\x03\x02\x02\x02ji\x03\x02\x02\x02" +
    "k\x07\x03\x02\x02\x02lo\x07\x03\x02\x02mn\x07\x04\x02\x02np\x07\x05\x02" +
    "\x02om\x03\x02\x02\x02op\x03\x02\x02\x02pq\x03\x02\x02\x02qv\x07I\x02" +
    "\x02rs\x07\x05\x02\x02su\x07I\x02\x02tr\x03\x02\x02\x02ux\x03\x02\x02" +
    "\x02vt\x03\x02\x02\x02vw\x03\x02\x02\x02wy\x03\x02\x02\x02xv\x03\x02\x02" +
    "\x02yz\x07\x06\x02\x02z\t\x03\x02\x02\x02{|\x07\x07\x02\x02|}\x07I\x02" +
    "\x02}~\x07\b\x02\x02~\x7F\x050\x19\x02\x7F\x80\x07\t\x02\x02\x80\v\x03" +
    "\x02\x02\x02\x81\x82\x07\n\x02\x02\x82\x88\x07\x06\x02\x02\x83\x84\x07" +
    '\n\x02\x02\x84\x85\x05B"\x02\x85\x86\x07\x06\x02\x02\x86\x88\x03\x02' +
    "\x02\x02\x87\x81\x03\x02\x02\x02\x87\x83\x03\x02\x02\x02\x88\r\x03\x02" +
    "\x02\x02\x89\x8A\x07\v\x02\x02\x8A\x90\x07\x06\x02\x02\x8B\x8C\x07\v\x02" +
    '\x02\x8C\x8D\x05B"\x02\x8D\x8E\x07\x06\x02\x02\x8E\x90\x03\x02\x02\x02' +
    "\x8F\x89\x03\x02\x02\x02\x8F\x8B\x03\x02\x02\x02\x90\x0F\x03\x02\x02\x02" +
    "\x91\x92\x07\f\x02\x02\x92\x93\x07\b\x02\x02\x93\x98\x05\x12\n\x02\x94" +
    "\x95\x07\r\x02\x02\x95\x97\x05\x12\n\x02\x96\x94\x03\x02\x02\x02\x97\x9A" +
    "\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99\x9C" +
    "\x03\x02\x02\x02\x9A\x98\x03\x02\x02\x02\x9B\x9D\x07\r\x02\x02\x9C\x9B" +
    "\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E\x9F" +
    "\x07\t\x02\x02\x9F\x11\x03\x02\x02\x02\xA0\xA1\x07I\x02\x02\xA1\xA2\x07" +
    '\x0E\x02\x02\xA2\xA5\x05B"\x02\xA3\xA5\x07I\x02\x02\xA4\xA0\x03\x02\x02' +
    "\x02\xA4\xA3\x03\x02\x02\x02\xA5\x13\x03\x02\x02\x02\xA6\xA7\x05J&\x02" +
    '\xA7\xA8\x07\x06\x02\x02\xA8\x15\x03\x02\x02\x02\xA9\xAA\x05B"\x02\xAA' +
    "\xAB\x07\x06\x02\x02\xAB\x17\x03\x02\x02\x02\xAC\xAD\x07\x0F\x02\x02\xAD" +
    '\xAE\x07\x10\x02\x02\xAE\xAF\x05B"\x02\xAF\xB0\x07\x11\x02\x02\xB0\xB4' +
    "\x07\b\x02\x02\xB1\xB3\x05\x1A\x0E\x02\xB2\xB1\x03\x02\x02\x02\xB3\xB6" +
    "\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB7" +
    "\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB7\xB8\x07\t\x02\x02\xB8\x19" +
    '\x03\x02\x02\x02\xB9\xBA\x07\x12\x02\x02\xBA\xBB\x05B"\x02\xBB\xBC\x07' +
    "\x13\x02\x02\xBC\xBD\x07\b\x02\x02\xBD\xBE\x050\x19\x02\xBE\xBF\x07\t" +
    "\x02\x02\xBF\xC6\x03\x02\x02\x02\xC0\xC1\x07\x14\x02\x02\xC1\xC2\x07\b" +
    "\x02\x02\xC2\xC3\x050\x19\x02\xC3\xC4\x07\t\x02\x02\xC4\xC6\x03\x02\x02" +
    "\x02\xC5\xB9\x03\x02\x02\x02\xC5\xC0\x03\x02\x02\x02\xC6\x1B\x03\x02\x02" +
    '\x02\xC7\xC8\x07\x15\x02\x02\xC8\xC9\x07\x10\x02\x02\xC9\xCA\x05B"\x02' +
    "\xCA\xCB\x07\x11\x02\x02\xCB\xCC\x07\b\x02\x02\xCC\xCD\x050\x19\x02\xCD" +
    "\xCF\x07\t\x02\x02\xCE\xD0\x05\x1E\x10\x02\xCF\xCE\x03\x02\x02\x02\xCF" +
    "\xD0\x03\x02\x02\x02\xD0\xDA\x03\x02\x02\x02\xD1\xD2\x07\x15\x02\x02\xD2" +
    '\xD3\x07\x10\x02\x02\xD3\xD4\x05B"\x02\xD4\xD5\x07\x11\x02\x02\xD5\xD7' +
    "\x050\x19\x02\xD6\xD8\x05\x1E\x10\x02\xD7\xD6\x03\x02\x02\x02\xD7\xD8" +
    "\x03\x02\x02\x02\xD8\xDA\x03\x02\x02\x02\xD9\xC7\x03\x02\x02\x02\xD9\xD1" +
    "\x03\x02\x02\x02\xDA\x1D\x03\x02\x02\x02\xDB\xDC\x07\x16\x02\x02\xDC\xDD" +
    "\x07\b\x02\x02\xDD\xDE\x050\x19\x02\xDE\xDF\x07\t\x02\x02\xDF\xE3\x03" +
    "\x02\x02\x02\xE0\xE1\x07\x16\x02\x02\xE1\xE3\x05\x1C\x0F\x02\xE2\xDB\x03" +
    "\x02\x02\x02\xE2\xE0\x03\x02\x02\x02\xE3\x1F\x03\x02\x02\x02\xE4\xE5\x07" +
    '\x17\x02\x02\xE5\xE6\x07\x10\x02\x02\xE6\xE7\x05B"\x02\xE7\xE8\x07\x11' +
    "\x02\x02\xE8\xE9\x07\b\x02\x02\xE9\xEA\x050\x19\x02\xEA\xEB\x07\t\x02" +
    "\x02\xEB!\x03\x02\x02\x02\xEC\xED\x07\x18\x02\x02\xED\xEF\x07\x10\x02" +
    "\x02\xEE\xF0\x05$\x13\x02\xEF\xEE\x03\x02\x02\x02\xEF\xF0\x03\x02\x02" +
    '\x02\xF0\xF1\x03\x02\x02\x02\xF1\xF3\x07\x06\x02\x02\xF2\xF4\x05B"\x02' +
    "\xF3\xF2\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02" +
    "\xF5\xF7\x07\x06\x02\x02\xF6\xF8\x05&\x14\x02\xF7\xF6\x03\x02\x02\x02" +
    "\xF7\xF8\x03\x02\x02\x02\xF8\xF9\x03\x02\x02\x02\xF9\xFA\x07\x11\x02\x02" +
    "\xFA\xFB\x07\b\x02\x02\xFB\xFC\x050\x19\x02\xFC\xFD\x07\t\x02\x02\xFD" +
    "#\x03\x02\x02\x02\xFE\u0103\x05J&\x02\xFF\u0100\x07\r\x02\x02\u0100\u0102" +
    "\x05J&\x02\u0101\xFF\x03\x02\x02\x02\u0102\u0105\x03\x02\x02\x02\u0103" +
    "\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\u010F\x03\x02" +
    '\x02\x02\u0105\u0103\x03\x02\x02\x02\u0106\u010B\x05B"\x02\u0107\u0108' +
    '\x07\r\x02\x02\u0108\u010A\x05B"\x02\u0109\u0107\x03\x02\x02\x02\u010A' +
    "\u010D\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02\u010B\u010C\x03\x02" +
    "\x02\x02\u010C\u010F\x03\x02\x02\x02\u010D\u010B\x03\x02\x02\x02\u010E" +
    "\xFE\x03\x02\x02\x02\u010E\u0106\x03\x02\x02\x02\u010F%\x03\x02\x02\x02" +
    "\u0110\u0115\x05J&\x02\u0111\u0112\x07\r\x02\x02\u0112\u0114\x05J&\x02" +
    "\u0113\u0111\x03\x02\x02\x02\u0114\u0117\x03\x02\x02\x02\u0115\u0113\x03" +
    "\x02\x02\x02\u0115\u0116\x03\x02\x02\x02\u0116\u0121\x03\x02\x02\x02\u0117" +
    '\u0115\x03\x02\x02\x02\u0118\u011D\x05B"\x02\u0119\u011A\x07\r\x02\x02' +
    '\u011A\u011C\x05B"\x02\u011B\u0119\x03\x02\x02\x02\u011C\u011F\x03\x02' +
    "\x02\x02\u011D\u011B\x03\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E" +
    "\u0121\x03\x02\x02\x02\u011F\u011D\x03\x02\x02\x02\u0120\u0110\x03\x02" +
    "\x02\x02\u0120\u0118\x03\x02\x02\x02\u0121\'\x03\x02\x02\x02\u0122\u0123" +
    "\x07\x19\x02\x02\u0123\u0124\x07\b\x02\x02\u0124\u0125\x050\x19\x02\u0125" +
    "\u0126\x07\t\x02\x02\u0126\u0127\x07\x17\x02\x02\u0127\u0128\x07\x10\x02" +
    '\x02\u0128\u0129\x05B"\x02\u0129\u012A\x07\x11\x02\x02\u012A\u012B\x07' +
    "\x06\x02\x02\u012B)\x03\x02\x02\x02\u012C\u012E\x07\x1A\x02\x02\u012D" +
    '\u012F\x05B"\x02\u012E\u012D\x03\x02\x02\x02\u012E\u012F\x03\x02\x02' +
    "\x02\u012F\u0130\x03\x02\x02\x02\u0130\u0131\x07\x06\x02\x02\u0131+\x03" +
    "\x02\x02\x02\u0132\u0133\x07\x1B\x02\x02\u0133\u0134\x07\b\x02\x02\u0134" +
    "\u0135\x050\x19\x02\u0135\u0136\x07\t\x02\x02\u0136-\x03\x02\x02\x02\u0137" +
    "\u0138\x07\x1C\x02\x02\u0138\u0139\x07\b\x02\x02\u0139\u013A\x050\x19" +
    "\x02\u013A\u013B\x07\t\x02\x02\u013B/\x03\x02\x02\x02\u013C\u013E\x05" +
    "\x06\x04\x02\u013D\u013C\x03\x02\x02\x02\u013E\u0141\x03\x02\x02\x02\u013F" +
    "\u013D\x03\x02\x02\x02\u013F\u0140\x03\x02\x02\x02\u01401\x03\x02\x02" +
    "\x02\u0141\u013F\x03\x02\x02\x02\u0142\u0143\x07\x1D\x02\x02\u0143\u0144" +
    "\x07I\x02\x02\u0144\u0146\x07\x10\x02\x02\u0145\u0147\x054\x1B\x02\u0146" +
    "\u0145\x03\x02\x02\x02\u0146\u0147\x03\x02\x02\x02\u0147\u0148\x03\x02" +
    "\x02\x02\u0148\u0149\x07\x11\x02\x02\u0149\u014A\x07\b\x02\x02\u014A\u014B" +
    "\x050\x19\x02\u014B\u014C\x07\t\x02\x02\u014C3\x03\x02\x02\x02\u014D\u0152" +
    "\x056\x1C\x02\u014E\u014F\x07\r\x02\x02\u014F\u0151\x056\x1C\x02\u0150" +
    "\u014E\x03\x02\x02\x02\u0151\u0154\x03\x02\x02\x02\u0152\u0150\x03\x02" +
    "\x02\x02\u0152\u0153\x03\x02\x02\x02\u01535\x03\x02\x02\x02\u0154\u0152" +
    "\x03\x02\x02\x02\u0155\u0157\x05L\'\x02\u0156\u0155\x03\x02\x02\x02\u0156" +
    "\u0157\x03\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158\u0159\x07I\x02" +
    "\x02\u01597\x03\x02\x02\x02\u015A\u015B\t\x02\x02\x02\u015B\u0160\x05" +
    ":\x1E\x02\u015C\u015D\x07\r\x02\x02\u015D\u015F\x05:\x1E\x02\u015E\u015C" +
    "\x03\x02\x02\x02\u015F\u0162\x03\x02\x02\x02\u0160\u015E\x03\x02\x02\x02" +
    "\u0160\u0161\x03\x02\x02\x02\u0161\u0163\x03\x02\x02\x02\u0162\u0160\x03" +
    "\x02\x02\x02\u0163\u0164\x07\x06\x02\x02\u01649\x03\x02\x02\x02\u0165" +
    '\u016A\x07I\x02\x02\u0166\u0167\x07 \x02\x02\u0167\u0168\x05B"\x02\u0168' +
    "\u0169\x07!\x02\x02\u0169\u016B\x03\x02\x02\x02\u016A\u0166\x03\x02\x02" +
    "\x02\u016A\u016B\x03\x02\x02\x02\u016B\u016E\x03\x02\x02\x02\u016C\u016D" +
    '\x07\x0E\x02\x02\u016D\u016F\x05B"\x02\u016E\u016C\x03\x02\x02\x02\u016E' +
    '\u016F\x03\x02\x02\x02\u016F;\x03\x02\x02\x02\u0170\u0171\x07"\x02\x02' +
    "\u0171\u0172\x05L\'\x02\u0172\u0173\x07I\x02\x02\u0173\u0175\x07#\x02" +
    "\x02\u0174\u0176\x07#\x02\x02\u0175\u0174\x03\x02\x02\x02\u0175\u0176" +
    "\x03\x02\x02\x02\u0176\u0177\x03\x02\x02\x02\u0177\u0178\x07\x0E\x02\x02" +
    "\u0178\u0179\x05> \x02\u0179\u017A\x07\x06\x02\x02\u017A\u0192\x03\x02" +
    "\x02\x02\u017B\u017C\x07\"\x02\x02\u017C\u017D\x05L\'\x02\u017D\u0184" +
    "\x07I\x02\x02\u017E\u017F\x07 \x02\x02\u017F\u0182\x07!\x02\x02\u0180" +
    "\u0181\x07 \x02\x02\u0181\u0183\x07!\x02\x02\u0182\u0180\x03\x02\x02\x02" +
    "\u0182\u0183\x03\x02\x02\x02\u0183\u0185\x03\x02\x02\x02\u0184\u017E\x03" +
    "\x02\x02\x02\u0184\u0185\x03\x02\x02\x02\u0185\u0186\x03\x02\x02\x02\u0186" +
    "\u0187\x07\x0E\x02\x02\u0187\u0188\x05> \x02\u0188\u0189\x07\x06\x02\x02" +
    '\u0189\u0192\x03\x02\x02\x02\u018A\u018B\x07"\x02\x02\u018B\u018C\x05' +
    "L\'\x02\u018C\u018D\x07I\x02\x02\u018D\u018E\x07\x0E\x02\x02\u018E\u018F" +
    '\x05B"\x02\u018F\u0190\x07\x06\x02\x02\u0190\u0192\x03\x02\x02\x02\u0191' +
    "\u0170\x03\x02\x02\x02\u0191\u017B\x03\x02\x02\x02\u0191\u018A\x03\x02" +
    "\x02\x02\u0192=\x03\x02\x02\x02\u0193\u019C\x07\b\x02\x02\u0194\u0199" +
    "\x05@!\x02\u0195\u0196\x07\r\x02\x02\u0196\u0198\x05@!\x02\u0197\u0195" +
    "\x03\x02\x02\x02\u0198\u019B\x03\x02\x02\x02\u0199\u0197\x03\x02\x02\x02" +
    "\u0199\u019A\x03\x02\x02\x02\u019A\u019D\x03\x02\x02\x02\u019B\u0199\x03" +
    "\x02\x02\x02\u019C\u0194\x03\x02\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D" +
    "\u019E\x03\x02\x02\x02\u019E\u019F\x07\t\x02\x02\u019F?\x03\x02\x02\x02" +
    '\u01A0\u01AE\x05B"\x02\u01A1\u01AA\x07\b\x02\x02\u01A2\u01A7\x05B"\x02' +
    '\u01A3\u01A4\x07\r\x02\x02\u01A4\u01A6\x05B"\x02\u01A5\u01A3\x03\x02' +
    "\x02\x02\u01A6\u01A9\x03\x02\x02\x02\u01A7\u01A5\x03\x02\x02\x02\u01A7" +
    "\u01A8\x03\x02\x02\x02\u01A8\u01AB\x03\x02\x02\x02\u01A9\u01A7\x03\x02" +
    "\x02\x02\u01AA\u01A2\x03\x02\x02\x02\u01AA\u01AB\x03\x02\x02\x02\u01AB" +
    "\u01AC\x03\x02\x02\x02\u01AC\u01AE\x07\t\x02\x02\u01AD\u01A0\x03\x02\x02" +
    "\x02\u01AD\u01A1\x03\x02\x02\x02\u01AEA\x03\x02\x02\x02\u01AF\u01B3\x05" +
    "D#\x02\u01B0\u01B2\x05H%\x02\u01B1\u01B0\x03\x02\x02\x02\u01B2\u01B5\x03" +
    "\x02\x02\x02\u01B3\u01B1\x03\x02\x02\x02\u01B3\u01B4\x03\x02\x02\x02\u01B4" +
    "C\x03\x02\x02\x02\u01B5\u01B3\x03\x02\x02\x02\u01B6\u01C5\x07I\x02\x02" +
    "\u01B7\u01C5\x07J\x02\x02\u01B8\u01C5\x07K\x02\x02\u01B9\u01C5\x07L\x02" +
    "\x02\u01BA\u01C5\x05F$\x02\u01BB\u01C5\x05J&\x02\u01BC\u01BD\x07$\x02" +
    '\x02\u01BD\u01C5\x05B"\x02\u01BE\u01BF\x07\x10\x02\x02\u01BF\u01C0\x05' +
    'B"\x02\u01C0\u01C1\x07\x11\x02\x02\u01C1\u01C5\x03\x02\x02\x02\u01C2' +
    '\u01C3\x07%\x02\x02\u01C3\u01C5\x05B"\x02\u01C4\u01B6\x03\x02\x02\x02' +
    "\u01C4\u01B7\x03\x02\x02\x02\u01C4\u01B8\x03\x02\x02\x02\u01C4\u01B9\x03" +
    "\x02\x02\x02\u01C4\u01BA\x03\x02\x02\x02\u01C4\u01BB\x03\x02\x02\x02\u01C4" +
    "\u01BC\x03\x02\x02\x02\u01C4\u01BE\x03\x02\x02\x02\u01C4\u01C2\x03\x02" +
    "\x02\x02\u01C5E\x03\x02\x02\x02\u01C6\u01C7\x07I\x02\x02\u01C7\u01D0\x07" +
    '\x10\x02\x02\u01C8\u01CD\x05B"\x02\u01C9\u01CA\x07\r\x02\x02\u01CA\u01CC' +
    '\x05B"\x02\u01CB\u01C9\x03\x02\x02\x02\u01CC\u01CF\x03\x02\x02\x02\u01CD' +
    "\u01CB\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02\u01CE\u01D1\x03\x02" +
    "\x02\x02\u01CF\u01CD\x03\x02\x02\x02\u01D0\u01C8\x03\x02\x02\x02\u01D0" +
    "\u01D1\x03\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2\u01D3\x07\x11" +
    "\x02\x02\u01D3G\x03\x02\x02\x02\u01D4\u01D5\x07 \x02\x02\u01D5\u01D6\x05" +
    'B"\x02\u01D6\u01DB\x07!\x02\x02\u01D7\u01D8\x07 \x02\x02\u01D8\u01D9' +
    '\x05B"\x02\u01D9\u01DA\x07!\x02\x02\u01DA\u01DC\x03\x02\x02\x02\u01DB' +
    "\u01D7\x03\x02\x02\x02\u01DB\u01DC\x03\x02\x02\x02\u01DC\u01E9\x03\x02" +
    '\x02\x02\u01DD\u01DE\t\x03\x02\x02\u01DE\u01E9\x05B"\x02\u01DF\u01E0' +
    '\t\x04\x02\x02\u01E0\u01E9\x05B"\x02\u01E1\u01E2\t\x05\x02\x02\u01E2' +
    '\u01E9\x05B"\x02\u01E3\u01E4\t\x06\x02\x02\u01E4\u01E9\x05B"\x02\u01E5' +
    '\u01E6\t\x07\x02\x02\u01E6\u01E9\x05B"\x02\u01E7\u01E9\t\b\x02\x02\u01E8' +
    "\u01D4\x03\x02\x02\x02\u01E8\u01DD\x03\x02\x02\x02\u01E8\u01DF\x03\x02" +
    "\x02\x02\u01E8\u01E1\x03\x02\x02\x02\u01E8\u01E3\x03\x02\x02\x02\u01E8" +
    "\u01E5\x03\x02\x02\x02\u01E8\u01E7\x03\x02\x02\x02\u01E9I\x03\x02\x02" +
    "\x02\u01EA\u01F4\x07I\x02\x02\u01EB\u01EC\x07 \x02\x02\u01EC\u01ED\x05" +
    'B"\x02\u01ED\u01F2\x07!\x02\x02\u01EE\u01EF\x07 \x02\x02\u01EF\u01F0' +
    '\x05B"\x02\u01F0\u01F1\x07!\x02\x02\u01F1\u01F3\x03\x02\x02\x02\u01F2' +
    "\u01EE\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02\u01F3\u01F5\x03\x02" +
    "\x02\x02\u01F4\u01EB\x03\x02\x02\x02\u01F4\u01F5\x03\x02\x02\x02\u01F5" +
    '\u01F6\x03\x02\x02\x02\u01F6\u01F7\t\t\x02\x02\u01F7\u01FD\x05B"\x02' +
    "\u01F8\u01F9\x07I\x02\x02\u01F9\u01FD\t\b\x02\x02\u01FA\u01FB\t\b\x02" +
    "\x02\u01FB\u01FD\x07I\x02\x02\u01FC\u01EA\x03\x02\x02\x02\u01FC\u01F8" +
    "\x03\x02\x02\x02\u01FC\u01FA\x03\x02\x02\x02\u01FDK\x03\x02\x02\x02\u01FE" +
    "\u01FF\t\n\x02\x02\u01FFM\x03\x02\x02\x025Q^jov\x87\x8F\x98\x9C\xA4\xB4" +
    "\xC5\xCF\xD7\xD9\xE2\xEF\xF3\xF7\u0103\u010B\u010E\u0115\u011D\u0120\u012E" +
    "\u013F\u0146\u0152\u0156\u0160\u016A\u016E\u0175\u0182\u0184\u0191\u0199" +
    "\u019C\u01A7\u01AA\u01AD\u01B3\u01C4\u01CD\u01D0\u01DB\u01E8\u01F2\u01F4" +
    "\u01FC";
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!gpc_grammarParser.__ATN) {
      gpc_grammarParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(gpc_grammarParser._serializedATN),
      );
    }

    return gpc_grammarParser.__ATN;
  }
}

export class ProgramContext extends ParserRuleContext {
  public EOF(): TerminalNode {
    return this.getToken(gpc_grammarParser.EOF, 0);
  }
  public global_statement(): Global_statementContext[];
  public global_statement(i: number): Global_statementContext;
  public global_statement(
    i?: number,
  ): Global_statementContext | Global_statementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Global_statementContext);
    } else {
      return this.getRuleContext(i, Global_statementContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_program;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitProgram) {
      return visitor.visitProgram(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Global_statementContext extends ParserRuleContext {
  public function_dec(): Function_decContext | undefined {
    return this.tryGetRuleContext(0, Function_decContext);
  }
  public variable_dec(): Variable_decContext | undefined {
    return this.tryGetRuleContext(0, Variable_decContext);
  }
  public array_dec(): Array_decContext | undefined {
    return this.tryGetRuleContext(0, Array_decContext);
  }
  public main_dec(): Main_decContext | undefined {
    return this.tryGetRuleContext(0, Main_decContext);
  }
  public init_dec(): Init_decContext | undefined {
    return this.tryGetRuleContext(0, Init_decContext);
  }
  public enum_dec(): Enum_decContext | undefined {
    return this.tryGetRuleContext(0, Enum_decContext);
  }
  public combo_dec(): Combo_decContext | undefined {
    return this.tryGetRuleContext(0, Combo_decContext);
  }
  public import_statement(): Import_statementContext | undefined {
    return this.tryGetRuleContext(0, Import_statementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_global_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitGlobal_statement) {
      return visitor.visitGlobal_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StatementContext extends ParserRuleContext {
  public if_statement(): If_statementContext | undefined {
    return this.tryGetRuleContext(0, If_statementContext);
  }
  public while_statement(): While_statementContext | undefined {
    return this.tryGetRuleContext(0, While_statementContext);
  }
  public for_statement(): For_statementContext | undefined {
    return this.tryGetRuleContext(0, For_statementContext);
  }
  public do_while_statement(): Do_while_statementContext | undefined {
    return this.tryGetRuleContext(0, Do_while_statementContext);
  }
  public return_statement(): Return_statementContext | undefined {
    return this.tryGetRuleContext(0, Return_statementContext);
  }
  public assignment_statement(): Assignment_statementContext | undefined {
    return this.tryGetRuleContext(0, Assignment_statementContext);
  }
  public expression_statement(): Expression_statementContext | undefined {
    return this.tryGetRuleContext(0, Expression_statementContext);
  }
  public switch_statement(): Switch_statementContext | undefined {
    return this.tryGetRuleContext(0, Switch_statementContext);
  }
  public break_statement(): Break_statementContext | undefined {
    return this.tryGetRuleContext(0, Break_statementContext);
  }
  public continue_statement(): Continue_statementContext | undefined {
    return this.tryGetRuleContext(0, Continue_statementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitStatement) {
      return visitor.visitStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Import_statementContext extends ParserRuleContext {
  public ID(): TerminalNode[];
  public ID(i: number): TerminalNode;
  public ID(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(gpc_grammarParser.ID);
    } else {
      return this.getToken(gpc_grammarParser.ID, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_import_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitImport_statement) {
      return visitor.visitImport_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Combo_decContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_combo_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitCombo_dec) {
      return visitor.visitCombo_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Break_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_break_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitBreak_statement) {
      return visitor.visitBreak_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Continue_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_continue_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitContinue_statement) {
      return visitor.visitContinue_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Enum_decContext extends ParserRuleContext {
  public enum_value(): Enum_valueContext[];
  public enum_value(i: number): Enum_valueContext;
  public enum_value(i?: number): Enum_valueContext | Enum_valueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Enum_valueContext);
    } else {
      return this.getRuleContext(i, Enum_valueContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_enum_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitEnum_dec) {
      return visitor.visitEnum_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Enum_valueContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_enum_value;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitEnum_value) {
      return visitor.visitEnum_value(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Assignment_statementContext extends ParserRuleContext {
  public assignment(): AssignmentContext {
    return this.getRuleContext(0, AssignmentContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_assignment_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitAssignment_statement) {
      return visitor.visitAssignment_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Expression_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_expression_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitExpression_statement) {
      return visitor.visitExpression_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Switch_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public case_block(): Case_blockContext[];
  public case_block(i: number): Case_blockContext;
  public case_block(i?: number): Case_blockContext | Case_blockContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Case_blockContext);
    } else {
      return this.getRuleContext(i, Case_blockContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_switch_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitSwitch_statement) {
      return visitor.visitSwitch_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Case_blockContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_case_block;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitCase_block) {
      return visitor.visitCase_block(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class If_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  public else_statement(): Else_statementContext | undefined {
    return this.tryGetRuleContext(0, Else_statementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_if_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitIf_statement) {
      return visitor.visitIf_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Else_statementContext extends ParserRuleContext {
  public block(): BlockContext | undefined {
    return this.tryGetRuleContext(0, BlockContext);
  }
  public if_statement(): If_statementContext | undefined {
    return this.tryGetRuleContext(0, If_statementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_else_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitElse_statement) {
      return visitor.visitElse_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class While_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_while_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitWhile_statement) {
      return visitor.visitWhile_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class For_statementContext extends ParserRuleContext {
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  public for_init(): For_initContext | undefined {
    return this.tryGetRuleContext(0, For_initContext);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public for_update(): For_updateContext | undefined {
    return this.tryGetRuleContext(0, For_updateContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_for_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitFor_statement) {
      return visitor.visitFor_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class For_initContext extends ParserRuleContext {
  public assignment(): AssignmentContext[];
  public assignment(i: number): AssignmentContext;
  public assignment(i?: number): AssignmentContext | AssignmentContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AssignmentContext);
    } else {
      return this.getRuleContext(i, AssignmentContext);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_for_init;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitFor_init) {
      return visitor.visitFor_init(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class For_updateContext extends ParserRuleContext {
  public assignment(): AssignmentContext[];
  public assignment(i: number): AssignmentContext;
  public assignment(i?: number): AssignmentContext | AssignmentContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AssignmentContext);
    } else {
      return this.getRuleContext(i, AssignmentContext);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_for_update;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitFor_update) {
      return visitor.visitFor_update(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Do_while_statementContext extends ParserRuleContext {
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_do_while_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitDo_while_statement) {
      return visitor.visitDo_while_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Return_statementContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_return_statement;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitReturn_statement) {
      return visitor.visitReturn_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Init_decContext extends ParserRuleContext {
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_init_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitInit_dec) {
      return visitor.visitInit_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Main_decContext extends ParserRuleContext {
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_main_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitMain_dec) {
      return visitor.visitMain_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BlockContext extends ParserRuleContext {
  public statement(): StatementContext[];
  public statement(i: number): StatementContext;
  public statement(i?: number): StatementContext | StatementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StatementContext);
    } else {
      return this.getRuleContext(i, StatementContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_block;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitBlock) {
      return visitor.visitBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Function_decContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  public parameter_list(): Parameter_listContext | undefined {
    return this.tryGetRuleContext(0, Parameter_listContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_function_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitFunction_dec) {
      return visitor.visitFunction_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Parameter_listContext extends ParserRuleContext {
  public parameter(): ParameterContext[];
  public parameter(i: number): ParameterContext;
  public parameter(i?: number): ParameterContext | ParameterContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ParameterContext);
    } else {
      return this.getRuleContext(i, ParameterContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_parameter_list;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitParameter_list) {
      return visitor.visitParameter_list(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public types(): TypesContext | undefined {
    return this.tryGetRuleContext(0, TypesContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_parameter;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitParameter) {
      return visitor.visitParameter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Variable_decContext extends ParserRuleContext {
  public variable_declarator(): Variable_declaratorContext[];
  public variable_declarator(i: number): Variable_declaratorContext;
  public variable_declarator(
    i?: number,
  ): Variable_declaratorContext | Variable_declaratorContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Variable_declaratorContext);
    } else {
      return this.getRuleContext(i, Variable_declaratorContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_variable_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitVariable_dec) {
      return visitor.visitVariable_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Variable_declaratorContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_variable_declarator;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitVariable_declarator) {
      return visitor.visitVariable_declarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Array_decContext extends ParserRuleContext {
  public types(): TypesContext {
    return this.getRuleContext(0, TypesContext);
  }
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public array_body(): Array_bodyContext | undefined {
    return this.tryGetRuleContext(0, Array_bodyContext);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_array_dec;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitArray_dec) {
      return visitor.visitArray_dec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Array_bodyContext extends ParserRuleContext {
  public array_row(): Array_rowContext[];
  public array_row(i: number): Array_rowContext;
  public array_row(i?: number): Array_rowContext | Array_rowContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Array_rowContext);
    } else {
      return this.getRuleContext(i, Array_rowContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_array_body;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitArray_body) {
      return visitor.visitArray_body(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Array_rowContext extends ParserRuleContext {
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_array_row;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitArray_row) {
      return visitor.visitArray_row(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public primaryExpression(): PrimaryExpressionContext {
    return this.getRuleContext(0, PrimaryExpressionContext);
  }
  public expressionSuffix(): ExpressionSuffixContext[];
  public expressionSuffix(i: number): ExpressionSuffixContext;
  public expressionSuffix(
    i?: number,
  ): ExpressionSuffixContext | ExpressionSuffixContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionSuffixContext);
    } else {
      return this.getRuleContext(i, ExpressionSuffixContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_expression;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PrimaryExpressionContext extends ParserRuleContext {
  public ID(): TerminalNode | undefined {
    return this.tryGetToken(gpc_grammarParser.ID, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(gpc_grammarParser.NUMBER, 0);
  }
  public STRING(): TerminalNode | undefined {
    return this.tryGetToken(gpc_grammarParser.STRING, 0);
  }
  public BOOLEAN(): TerminalNode | undefined {
    return this.tryGetToken(gpc_grammarParser.BOOLEAN, 0);
  }
  public function_call(): Function_callContext | undefined {
    return this.tryGetRuleContext(0, Function_callContext);
  }
  public assignment(): AssignmentContext | undefined {
    return this.tryGetRuleContext(0, AssignmentContext);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_primaryExpression;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitPrimaryExpression) {
      return visitor.visitPrimaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Function_callContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_function_call;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitFunction_call) {
      return visitor.visitFunction_call(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionSuffixContext extends ParserRuleContext {
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_expressionSuffix;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitExpressionSuffix) {
      return visitor.visitExpressionSuffix(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignmentContext extends ParserRuleContext {
  public ID(): TerminalNode {
    return this.getToken(gpc_grammarParser.ID, 0);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_assignment;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitAssignment) {
      return visitor.visitAssignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypesContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return gpc_grammarParser.RULE_types;
  }
  // @Override
  public accept<Result>(visitor: gpc_grammarVisitor<Result>): Result {
    if (visitor.visitTypes) {
      return visitor.visitTypes(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
