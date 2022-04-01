// Generated from src/grammar/ElasticsearchGrammar.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { ElasticsearchGrammarListener } from './ElasticsearchGrammarListener';
import { ElasticsearchGrammarVisitor } from './ElasticsearchGrammarVisitor';

export class ElasticsearchGrammarParser extends Parser {
  public static readonly GT = 1;
  public static readonly GTE = 2;
  public static readonly LT = 3;
  public static readonly LTE = 4;
  public static readonly LPAREN = 5;
  public static readonly RPAREN = 6;
  public static readonly LBRACK = 7;
  public static readonly RBRACK = 8;
  public static readonly COLON = 9;
  public static readonly PLUS = 10;
  public static readonly MINUS = 11;
  public static readonly STAR = 12;
  public static readonly QMARK = 13;
  public static readonly LCURLY = 14;
  public static readonly RCURLY = 15;
  public static readonly CARAT = 16;
  public static readonly TILDE = 17;
  public static readonly DQUOTE = 18;
  public static readonly SQUOTE = 19;
  public static readonly TO = 20;
  public static readonly AND = 21;
  public static readonly OR = 22;
  public static readonly NOT = 23;
  public static readonly WS = 24;
  public static readonly NUMBER = 25;
  public static readonly DATE_TOKEN = 26;
  public static readonly TERM_NORMAL = 27;
  public static readonly TERM_TRUNCATED = 28;
  public static readonly PHRASE = 29;
  public static readonly PHRASE_ANYTHING = 30;
  public static readonly OPERATOR = 31;
  public static readonly ATOM = 32;
  public static readonly MODIFIER = 33;
  public static readonly TMODIFIER = 34;
  public static readonly CLAUSE = 35;
  public static readonly FIELD = 36;
  public static readonly FUZZY = 37;
  public static readonly BOOST = 38;
  public static readonly QNORMAL = 39;
  public static readonly QPHRASE = 40;
  public static readonly QPHRASETRUNC = 41;
  public static readonly QTRUNCATED = 42;
  public static readonly QRANGEIN = 43;
  public static readonly QRANGEEX = 44;
  public static readonly QANYTHING = 45;
  public static readonly QDATE = 46;
  public static readonly RULE_range_term = 0;
  public static readonly RULE_one_sided_range_term = 1;
  public static readonly RULE_mainQ = 2;
  public static readonly RULE_clauseDefault = 3;
  public static readonly RULE_clauseOr = 4;
  public static readonly RULE_clauseAnd = 5;
  public static readonly RULE_clauseNot = 6;
  public static readonly RULE_clauseBasic = 7;
  public static readonly RULE_atom = 8;
  public static readonly RULE_field = 9;
  public static readonly RULE_value = 10;
  public static readonly RULE_anything = 11;
  public static readonly RULE_two_sided_range_term = 12;
  public static readonly RULE_range_value = 13;
  public static readonly RULE_multi_value = 14;
  public static readonly RULE_normal = 15;
  public static readonly RULE_truncated = 16;
  public static readonly RULE_quoted_truncated = 17;
  public static readonly RULE_quoted = 18;
  public static readonly RULE_modifier = 19;
  public static readonly RULE_term_modifier = 20;
  public static readonly RULE_boost = 21;
  public static readonly RULE_fuzzy = 22;
  public static readonly RULE_not_ = 23;
  public static readonly RULE_and_ = 24;
  public static readonly RULE_or_ = 25;
  public static readonly RULE_date = 26;
  public static readonly RULE_sep = 27;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'range_term',
    'one_sided_range_term',
    'mainQ',
    'clauseDefault',
    'clauseOr',
    'clauseAnd',
    'clauseNot',
    'clauseBasic',
    'atom',
    'field',
    'value',
    'anything',
    'two_sided_range_term',
    'range_value',
    'multi_value',
    'normal',
    'truncated',
    'quoted_truncated',
    'quoted',
    'modifier',
    'term_modifier',
    'boost',
    'fuzzy',
    'not_',
    'and_',
    'or_',
    'date',
    'sep',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'>'",
    "'>='",
    "'<'",
    "'<='",
    "'('",
    "')'",
    "'['",
    "']'",
    "':'",
    "'+'",
    undefined,
    "'*'",
    undefined,
    "'{'",
    "'}'",
    undefined,
    undefined,
    "'\"'",
    "'''",
    "'TO'",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    'GT',
    'GTE',
    'LT',
    'LTE',
    'LPAREN',
    'RPAREN',
    'LBRACK',
    'RBRACK',
    'COLON',
    'PLUS',
    'MINUS',
    'STAR',
    'QMARK',
    'LCURLY',
    'RCURLY',
    'CARAT',
    'TILDE',
    'DQUOTE',
    'SQUOTE',
    'TO',
    'AND',
    'OR',
    'NOT',
    'WS',
    'NUMBER',
    'DATE_TOKEN',
    'TERM_NORMAL',
    'TERM_TRUNCATED',
    'PHRASE',
    'PHRASE_ANYTHING',
    'OPERATOR',
    'ATOM',
    'MODIFIER',
    'TMODIFIER',
    'CLAUSE',
    'FIELD',
    'FUZZY',
    'BOOST',
    'QNORMAL',
    'QPHRASE',
    'QPHRASETRUNC',
    'QTRUNCATED',
    'QRANGEIN',
    'QRANGEEX',
    'QANYTHING',
    'QDATE',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    ElasticsearchGrammarParser._LITERAL_NAMES,
    ElasticsearchGrammarParser._SYMBOLIC_NAMES,
    []
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return ElasticsearchGrammarParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'ElasticsearchGrammar.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return ElasticsearchGrammarParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return ElasticsearchGrammarParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(
      ElasticsearchGrammarParser._ATN,
      this
    );
  }
  // @RuleVersion(0)
  public range_term(): Range_termContext {
    const _localctx: Range_termContext = new Range_termContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 0, ElasticsearchGrammarParser.RULE_range_term);
    try {
      this.state = 58;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case ElasticsearchGrammarParser.LBRACK:
        case ElasticsearchGrammarParser.LCURLY:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 56;
            this.two_sided_range_term();
          }
          break;
        case ElasticsearchGrammarParser.GT:
        case ElasticsearchGrammarParser.GTE:
        case ElasticsearchGrammarParser.LT:
        case ElasticsearchGrammarParser.LTE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 57;
            this.one_sided_range_term();
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
  public one_sided_range_term(): One_sided_range_termContext {
    const _localctx: One_sided_range_termContext = new One_sided_range_termContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      2,
      ElasticsearchGrammarParser.RULE_one_sided_range_term
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 60;
        _localctx._op = this._input.LT(1);
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << ElasticsearchGrammarParser.GT) |
                (1 << ElasticsearchGrammarParser.GTE) |
                (1 << ElasticsearchGrammarParser.LT) |
                (1 << ElasticsearchGrammarParser.LTE))) !==
              0
          )
        ) {
          _localctx._op = this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 61;
        _localctx._val = this.range_value();
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
  public mainQ(): MainQContext {
    const _localctx: MainQContext = new MainQContext(this._ctx, this.state);
    this.enterRule(_localctx, 4, ElasticsearchGrammarParser.RULE_mainQ);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 64;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
          case 1:
            {
              this.state = 63;
              this.sep();
            }
            break;
        }
        this.state = 66;
        _localctx._clause = this.clauseDefault();
        this.state = 68;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 67;
            this.sep();
          }
        }

        this.state = 70;
        this.match(ElasticsearchGrammarParser.EOF);
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
  public clauseDefault(): ClauseDefaultContext {
    const _localctx: ClauseDefaultContext = new ClauseDefaultContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 6, ElasticsearchGrammarParser.RULE_clauseDefault);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 72;
        this.clauseOr();
        this.state = 79;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 74;
                this._errHandler.sync(this);
                switch (
                  this.interpreter.adaptivePredict(this._input, 3, this._ctx)
                ) {
                  case 1:
                    {
                      this.state = 73;
                      this.sep();
                    }
                    break;
                }
                this.state = 76;
                this.clauseOr();
              }
            }
          }
          this.state = 81;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
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
  public clauseOr(): ClauseOrContext {
    const _localctx: ClauseOrContext = new ClauseOrContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 8, ElasticsearchGrammarParser.RULE_clauseOr);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 82;
        this.clauseAnd();
        this.state = 88;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 83;
                this.or_();
                this.state = 84;
                this.clauseAnd();
              }
            }
          }
          this.state = 90;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
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
  public clauseAnd(): ClauseAndContext {
    const _localctx: ClauseAndContext = new ClauseAndContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 10, ElasticsearchGrammarParser.RULE_clauseAnd);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 91;
        this.clauseNot();
        this.state = 97;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 92;
                this.and_();
                this.state = 93;
                this.clauseNot();
              }
            }
          }
          this.state = 99;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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
  public clauseNot(): ClauseNotContext {
    const _localctx: ClauseNotContext = new ClauseNotContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 12, ElasticsearchGrammarParser.RULE_clauseNot);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 100;
        this.clauseBasic();
        this.state = 106;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 101;
                this.not_();
                this.state = 102;
                this.clauseBasic();
              }
            }
          }
          this.state = 108;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
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
  public clauseBasic(): ClauseBasicContext {
    const _localctx: ClauseBasicContext = new ClauseBasicContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 14, ElasticsearchGrammarParser.RULE_clauseBasic);
    let _la: number;
    try {
      this.state = 128;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 13, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 110;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 109;
                this.sep();
              }
            }

            this.state = 113;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.PLUS ||
              _la === ElasticsearchGrammarParser.MINUS
            ) {
              {
                this.state = 112;
                this.modifier();
              }
            }

            this.state = 115;
            this.match(ElasticsearchGrammarParser.LPAREN);
            this.state = 116;
            this.clauseDefault();
            this.state = 118;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 117;
                this.sep();
              }
            }

            this.state = 120;
            this.match(ElasticsearchGrammarParser.RPAREN);
            this.state = 122;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.CARAT ||
              _la === ElasticsearchGrammarParser.TILDE
            ) {
              {
                this.state = 121;
                this.term_modifier();
              }
            }
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 125;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 124;
                this.sep();
              }
            }

            this.state = 127;
            this.atom();
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
  public atom(): AtomContext {
    const _localctx: AtomContext = new AtomContext(this._ctx, this.state);
    this.enterRule(_localctx, 16, ElasticsearchGrammarParser.RULE_atom);
    let _la: number;
    try {
      this.state = 148;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 131;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.PLUS ||
              _la === ElasticsearchGrammarParser.MINUS
            ) {
              {
                this.state = 130;
                this.modifier();
              }
            }

            this.state = 133;
            this.field();
            this.state = 134;
            this.multi_value();
            this.state = 136;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.CARAT ||
              _la === ElasticsearchGrammarParser.TILDE
            ) {
              {
                this.state = 135;
                this.term_modifier();
              }
            }
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 139;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.PLUS ||
              _la === ElasticsearchGrammarParser.MINUS
            ) {
              {
                this.state = 138;
                this.modifier();
              }
            }

            this.state = 142;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 17, this._ctx)
            ) {
              case 1:
                {
                  this.state = 141;
                  this.field();
                }
                break;
            }
            this.state = 144;
            this.value();
            this.state = 146;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === ElasticsearchGrammarParser.CARAT ||
              _la === ElasticsearchGrammarParser.TILDE
            ) {
              {
                this.state = 145;
                this.term_modifier();
              }
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
  public field(): FieldContext {
    const _localctx: FieldContext = new FieldContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, ElasticsearchGrammarParser.RULE_field);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 150;
        this.match(ElasticsearchGrammarParser.TERM_NORMAL);
        this.state = 151;
        this.match(ElasticsearchGrammarParser.COLON);
        this.state = 153;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 152;
            this.sep();
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
  public value(): ValueContext {
    const _localctx: ValueContext = new ValueContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, ElasticsearchGrammarParser.RULE_value);
    try {
      this.state = 163;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 155;
            this.range_term();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 156;
            this.normal();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 157;
            this.truncated();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 158;
            this.quoted();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 159;
            this.quoted_truncated();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 160;
            this.match(ElasticsearchGrammarParser.QMARK);
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 161;
            this.anything();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 162;
            this.match(ElasticsearchGrammarParser.STAR);
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
  public anything(): AnythingContext {
    const _localctx: AnythingContext = new AnythingContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 22, ElasticsearchGrammarParser.RULE_anything);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 165;
        this.match(ElasticsearchGrammarParser.STAR);
        this.state = 166;
        this.match(ElasticsearchGrammarParser.COLON);
        this.state = 167;
        this.match(ElasticsearchGrammarParser.STAR);
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
  public two_sided_range_term(): Two_sided_range_termContext {
    const _localctx: Two_sided_range_termContext = new Two_sided_range_termContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      24,
      ElasticsearchGrammarParser.RULE_two_sided_range_term
    );
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 169;
        _localctx._start_type = this._input.LT(1);
        _la = this._input.LA(1);
        if (
          !(
            _la === ElasticsearchGrammarParser.LBRACK ||
            _la === ElasticsearchGrammarParser.LCURLY
          )
        ) {
          _localctx._start_type = this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 171;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 170;
            this.sep();
          }
        }

        {
          this.state = 173;
          _localctx._a = this.range_value();
        }
        this.state = 175;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 23, this._ctx)) {
          case 1:
            {
              this.state = 174;
              this.sep();
            }
            break;
        }
        this.state = 187;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << ElasticsearchGrammarParser.STAR) |
              (1 << ElasticsearchGrammarParser.TO) |
              (1 << ElasticsearchGrammarParser.WS) |
              (1 << ElasticsearchGrammarParser.NUMBER) |
              (1 << ElasticsearchGrammarParser.DATE_TOKEN) |
              (1 << ElasticsearchGrammarParser.TERM_NORMAL) |
              (1 << ElasticsearchGrammarParser.TERM_TRUNCATED) |
              (1 << ElasticsearchGrammarParser.PHRASE) |
              (1 << ElasticsearchGrammarParser.PHRASE_ANYTHING))) !==
            0
        ) {
          {
            this.state = 178;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.TO) {
              {
                this.state = 177;
                this.match(ElasticsearchGrammarParser.TO);
              }
            }

            this.state = 181;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 180;
                this.sep();
              }
            }

            this.state = 183;
            _localctx._b = this.range_value();
            this.state = 185;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 184;
                this.sep();
              }
            }
          }
        }

        this.state = 189;
        _localctx._end_type = this._input.LT(1);
        _la = this._input.LA(1);
        if (
          !(
            _la === ElasticsearchGrammarParser.RBRACK ||
            _la === ElasticsearchGrammarParser.RCURLY
          )
        ) {
          _localctx._end_type = this._errHandler.recoverInline(this);
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
  // @RuleVersion(0)
  public range_value(): Range_valueContext {
    const _localctx: Range_valueContext = new Range_valueContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 26, ElasticsearchGrammarParser.RULE_range_value);
    try {
      this.state = 197;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case ElasticsearchGrammarParser.TERM_TRUNCATED:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 191;
            this.truncated();
          }
          break;
        case ElasticsearchGrammarParser.PHRASE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 192;
            this.quoted();
          }
          break;
        case ElasticsearchGrammarParser.PHRASE_ANYTHING:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 193;
            this.quoted_truncated();
          }
          break;
        case ElasticsearchGrammarParser.DATE_TOKEN:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 194;
            this.date();
          }
          break;
        case ElasticsearchGrammarParser.NUMBER:
        case ElasticsearchGrammarParser.TERM_NORMAL:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 195;
            this.normal();
          }
          break;
        case ElasticsearchGrammarParser.STAR:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 196;
            this.match(ElasticsearchGrammarParser.STAR);
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
  public multi_value(): Multi_valueContext {
    const _localctx: Multi_valueContext = new Multi_valueContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 28, ElasticsearchGrammarParser.RULE_multi_value);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 199;
        this.match(ElasticsearchGrammarParser.LPAREN);
        this.state = 200;
        this.clauseDefault();
        this.state = 202;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 201;
            this.sep();
          }
        }

        this.state = 204;
        this.match(ElasticsearchGrammarParser.RPAREN);
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
  public normal(): NormalContext {
    const _localctx: NormalContext = new NormalContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, ElasticsearchGrammarParser.RULE_normal);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 206;
        _la = this._input.LA(1);
        if (
          !(
            _la === ElasticsearchGrammarParser.NUMBER ||
            _la === ElasticsearchGrammarParser.TERM_NORMAL
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
  // @RuleVersion(0)
  public truncated(): TruncatedContext {
    const _localctx: TruncatedContext = new TruncatedContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 32, ElasticsearchGrammarParser.RULE_truncated);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 208;
        this.match(ElasticsearchGrammarParser.TERM_TRUNCATED);
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
  public quoted_truncated(): Quoted_truncatedContext {
    const _localctx: Quoted_truncatedContext = new Quoted_truncatedContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      34,
      ElasticsearchGrammarParser.RULE_quoted_truncated
    );
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 210;
        this.match(ElasticsearchGrammarParser.PHRASE_ANYTHING);
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
  public quoted(): QuotedContext {
    const _localctx: QuotedContext = new QuotedContext(this._ctx, this.state);
    this.enterRule(_localctx, 36, ElasticsearchGrammarParser.RULE_quoted);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 212;
        this.match(ElasticsearchGrammarParser.PHRASE);
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
  public modifier(): ModifierContext {
    const _localctx: ModifierContext = new ModifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 38, ElasticsearchGrammarParser.RULE_modifier);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 214;
        _la = this._input.LA(1);
        if (
          !(
            _la === ElasticsearchGrammarParser.PLUS ||
            _la === ElasticsearchGrammarParser.MINUS
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
  // @RuleVersion(0)
  public term_modifier(): Term_modifierContext {
    const _localctx: Term_modifierContext = new Term_modifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(
      _localctx,
      40,
      ElasticsearchGrammarParser.RULE_term_modifier
    );
    let _la: number;
    try {
      this.state = 224;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case ElasticsearchGrammarParser.CARAT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 216;
            this.boost();
            this.state = 218;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.TILDE) {
              {
                this.state = 217;
                this.fuzzy();
              }
            }
          }
          break;
        case ElasticsearchGrammarParser.TILDE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 220;
            this.fuzzy();
            this.state = 222;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.CARAT) {
              {
                this.state = 221;
                this.boost();
              }
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
  public boost(): BoostContext {
    const _localctx: BoostContext = new BoostContext(this._ctx, this.state);
    this.enterRule(_localctx, 42, ElasticsearchGrammarParser.RULE_boost);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        {
          this.state = 226;
          this.match(ElasticsearchGrammarParser.CARAT);
        }
        this.state = 228;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 33, this._ctx)) {
          case 1:
            {
              this.state = 227;
              this.match(ElasticsearchGrammarParser.NUMBER);
            }
            break;
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
  public fuzzy(): FuzzyContext {
    const _localctx: FuzzyContext = new FuzzyContext(this._ctx, this.state);
    this.enterRule(_localctx, 44, ElasticsearchGrammarParser.RULE_fuzzy);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        {
          this.state = 230;
          this.match(ElasticsearchGrammarParser.TILDE);
        }
        this.state = 232;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 34, this._ctx)) {
          case 1:
            {
              this.state = 231;
              this.match(ElasticsearchGrammarParser.NUMBER);
            }
            break;
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
  public not_(): Not_Context {
    const _localctx: Not_Context = new Not_Context(this._ctx, this.state);
    this.enterRule(_localctx, 46, ElasticsearchGrammarParser.RULE_not_);
    let _la: number;
    try {
      this.state = 246;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 38, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 235;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 234;
                this.sep();
              }
            }

            this.state = 237;
            this.match(ElasticsearchGrammarParser.AND);
            this.state = 239;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 238;
                this.sep();
              }
            }

            this.state = 241;
            this.match(ElasticsearchGrammarParser.NOT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 243;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === ElasticsearchGrammarParser.WS) {
              {
                this.state = 242;
                this.sep();
              }
            }

            this.state = 245;
            this.match(ElasticsearchGrammarParser.NOT);
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
  public and_(): And_Context {
    const _localctx: And_Context = new And_Context(this._ctx, this.state);
    this.enterRule(_localctx, 48, ElasticsearchGrammarParser.RULE_and_);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 249;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 248;
            this.sep();
          }
        }

        this.state = 251;
        this.match(ElasticsearchGrammarParser.AND);
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
  public or_(): Or_Context {
    const _localctx: Or_Context = new Or_Context(this._ctx, this.state);
    this.enterRule(_localctx, 50, ElasticsearchGrammarParser.RULE_or_);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 254;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === ElasticsearchGrammarParser.WS) {
          {
            this.state = 253;
            this.sep();
          }
        }

        this.state = 256;
        this.match(ElasticsearchGrammarParser.OR);
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
  public date(): DateContext {
    const _localctx: DateContext = new DateContext(this._ctx, this.state);
    this.enterRule(_localctx, 52, ElasticsearchGrammarParser.RULE_date);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 258;
        this.match(ElasticsearchGrammarParser.DATE_TOKEN);
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
  public sep(): SepContext {
    const _localctx: SepContext = new SepContext(this._ctx, this.state);
    this.enterRule(_localctx, 54, ElasticsearchGrammarParser.RULE_sep);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 261;
        this._errHandler.sync(this);
        _alt = 1;
        do {
          switch (_alt) {
            case 1:
              {
                {
                  this.state = 260;
                  this.match(ElasticsearchGrammarParser.WS);
                }
              }
              break;
            default:
              throw new NoViableAltException(this);
          }
          this.state = 263;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
        } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x030\u010C\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x03\x02\x03\x02\x05\x02=\n\x02\x03\x03\x03\x03\x03\x03\x03' +
    '\x04\x05\x04C\n\x04\x03\x04\x03\x04\x05\x04G\n\x04\x03\x04\x03\x04\x03' +
    '\x05\x03\x05\x05\x05M\n\x05\x03\x05\x07\x05P\n\x05\f\x05\x0E\x05S\v\x05' +
    '\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06Y\n\x06\f\x06\x0E\x06\\\v\x06' +
    '\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07b\n\x07\f\x07\x0E\x07e\v\x07\x03' +
    '\b\x03\b\x03\b\x03\b\x07\bk\n\b\f\b\x0E\bn\v\b\x03\t\x05\tq\n\t\x03\t' +
    '\x05\tt\n\t\x03\t\x03\t\x03\t\x05\ty\n\t\x03\t\x03\t\x05\t}\n\t\x03\t' +
    '\x05\t\x80\n\t\x03\t\x05\t\x83\n\t\x03\n\x05\n\x86\n\n\x03\n\x03\n\x03' +
    '\n\x05\n\x8B\n\n\x03\n\x05\n\x8E\n\n\x03\n\x05\n\x91\n\n\x03\n\x03\n\x05' +
    '\n\x95\n\n\x05\n\x97\n\n\x03\v\x03\v\x03\v\x05\v\x9C\n\v\x03\f\x03\f\x03' +
    '\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xA6\n\f\x03\r\x03\r\x03\r\x03\r' +
    '\x03\x0E\x03\x0E\x05\x0E\xAE\n\x0E\x03\x0E\x03\x0E\x05\x0E\xB2\n\x0E\x03' +
    '\x0E\x05\x0E\xB5\n\x0E\x03\x0E\x05\x0E\xB8\n\x0E\x03\x0E\x03\x0E\x05\x0E' +
    '\xBC\n\x0E\x05\x0E\xBE\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03' +
    '\x0F\x03\x0F\x03\x0F\x05\x0F\xC8\n\x0F\x03\x10\x03\x10\x03\x10\x05\x10' +
    '\xCD\n\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03' +
    '\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x05\x16\xDD\n\x16' +
    '\x03\x16\x03\x16\x05\x16\xE1\n\x16\x05\x16\xE3\n\x16\x03\x17\x03\x17\x05' +
    '\x17\xE7\n\x17\x03\x18\x03\x18\x05\x18\xEB\n\x18\x03\x19\x05\x19\xEE\n' +
    '\x19\x03\x19\x03\x19\x05\x19\xF2\n\x19\x03\x19\x03\x19\x05\x19\xF6\n\x19' +
    '\x03\x19\x05\x19\xF9\n\x19\x03\x1A\x05\x1A\xFC\n\x1A\x03\x1A\x03\x1A\x03' +
    '\x1B\x05\x1B\u0101\n\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x06\x1D' +
    '\u0108\n\x1D\r\x1D\x0E\x1D\u0109\x03\x1D\x02\x02\x02\x1E\x02\x02\x04\x02' +
    '\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18' +
    '\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x02' +
    '0\x022\x024\x026\x028\x02\x02\x07\x03\x02\x03\x06\x04\x02\t\t\x10\x10' +
    '\x04\x02\n\n\x11\x11\x04\x02\x1B\x1B\x1D\x1D\x03\x02\f\r\x02\u0123\x02' +
    '<\x03\x02\x02\x02\x04>\x03\x02\x02\x02\x06B\x03\x02\x02\x02\bJ\x03\x02' +
    '\x02\x02\nT\x03\x02\x02\x02\f]\x03\x02\x02\x02\x0Ef\x03\x02\x02\x02\x10' +
    '\x82\x03\x02\x02\x02\x12\x96\x03\x02\x02\x02\x14\x98\x03\x02\x02\x02\x16' +
    '\xA5\x03\x02\x02\x02\x18\xA7\x03\x02\x02\x02\x1A\xAB\x03\x02\x02\x02\x1C' +
    '\xC7\x03\x02\x02\x02\x1E\xC9\x03\x02\x02\x02 \xD0\x03\x02\x02\x02"\xD2' +
    '\x03\x02\x02\x02$\xD4\x03\x02\x02\x02&\xD6\x03\x02\x02\x02(\xD8\x03\x02' +
    '\x02\x02*\xE2\x03\x02\x02\x02,\xE4\x03\x02\x02\x02.\xE8\x03\x02\x02\x02' +
    '0\xF8\x03\x02\x02\x022\xFB\x03\x02\x02\x024\u0100\x03\x02\x02\x026\u0104' +
    '\x03\x02\x02\x028\u0107\x03\x02\x02\x02:=\x05\x1A\x0E\x02;=\x05\x04\x03' +
    '\x02<:\x03\x02\x02\x02<;\x03\x02\x02\x02=\x03\x03\x02\x02\x02>?\t\x02' +
    '\x02\x02?@\x05\x1C\x0F\x02@\x05\x03\x02\x02\x02AC\x058\x1D\x02BA\x03\x02' +
    '\x02\x02BC\x03\x02\x02\x02CD\x03\x02\x02\x02DF\x05\b\x05\x02EG\x058\x1D' +
    '\x02FE\x03\x02\x02\x02FG\x03\x02\x02\x02GH\x03\x02\x02\x02HI\x07\x02\x02' +
    '\x03I\x07\x03\x02\x02\x02JQ\x05\n\x06\x02KM\x058\x1D\x02LK\x03\x02\x02' +
    '\x02LM\x03\x02\x02\x02MN\x03\x02\x02\x02NP\x05\n\x06\x02OL\x03\x02\x02' +
    '\x02PS\x03\x02\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02\x02R\t\x03\x02' +
    '\x02\x02SQ\x03\x02\x02\x02TZ\x05\f\x07\x02UV\x054\x1B\x02VW\x05\f\x07' +
    '\x02WY\x03\x02\x02\x02XU\x03\x02\x02\x02Y\\\x03\x02\x02\x02ZX\x03\x02' +
    '\x02\x02Z[\x03\x02\x02\x02[\v\x03\x02\x02\x02\\Z\x03\x02\x02\x02]c\x05' +
    '\x0E\b\x02^_\x052\x1A\x02_`\x05\x0E\b\x02`b\x03\x02\x02\x02a^\x03\x02' +
    '\x02\x02be\x03\x02\x02\x02ca\x03\x02\x02\x02cd\x03\x02\x02\x02d\r\x03' +
    '\x02\x02\x02ec\x03\x02\x02\x02fl\x05\x10\t\x02gh\x050\x19\x02hi\x05\x10' +
    '\t\x02ik\x03\x02\x02\x02jg\x03\x02\x02\x02kn\x03\x02\x02\x02lj\x03\x02' +
    '\x02\x02lm\x03\x02\x02\x02m\x0F\x03\x02\x02\x02nl\x03\x02\x02\x02oq\x05' +
    '8\x1D\x02po\x03\x02\x02\x02pq\x03\x02\x02\x02qs\x03\x02\x02\x02rt\x05' +
    '(\x15\x02sr\x03\x02\x02\x02st\x03\x02\x02\x02tu\x03\x02\x02\x02uv\x07' +
    '\x07\x02\x02vx\x05\b\x05\x02wy\x058\x1D\x02xw\x03\x02\x02\x02xy\x03\x02' +
    '\x02\x02yz\x03\x02\x02\x02z|\x07\b\x02\x02{}\x05*\x16\x02|{\x03\x02\x02' +
    '\x02|}\x03\x02\x02\x02}\x83\x03\x02\x02\x02~\x80\x058\x1D\x02\x7F~\x03' +
    '\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81\x83\x05' +
    '\x12\n\x02\x82p\x03\x02\x02\x02\x82\x7F\x03\x02\x02\x02\x83\x11\x03\x02' +
    '\x02\x02\x84\x86\x05(\x15\x02\x85\x84\x03\x02\x02\x02\x85\x86\x03\x02' +
    '\x02\x02\x86\x87\x03\x02\x02\x02\x87\x88\x05\x14\v\x02\x88\x8A\x05\x1E' +
    '\x10\x02\x89\x8B\x05*\x16\x02\x8A\x89\x03\x02\x02\x02\x8A\x8B\x03\x02' +
    '\x02\x02\x8B\x97\x03\x02\x02\x02\x8C\x8E\x05(\x15\x02\x8D\x8C\x03\x02' +
    '\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x90\x03\x02\x02\x02\x8F\x91\x05\x14' +
    '\v\x02\x90\x8F\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91\x92\x03\x02' +
    '\x02\x02\x92\x94\x05\x16\f\x02\x93\x95\x05*\x16\x02\x94\x93\x03\x02\x02' +
    '\x02\x94\x95\x03\x02\x02\x02\x95\x97\x03\x02\x02\x02\x96\x85\x03\x02\x02' +
    '\x02\x96\x8D\x03\x02\x02\x02\x97\x13\x03\x02\x02\x02\x98\x99\x07\x1D\x02' +
    '\x02\x99\x9B\x07\v\x02\x02\x9A\x9C\x058\x1D\x02\x9B\x9A\x03\x02\x02\x02' +
    '\x9B\x9C\x03\x02\x02\x02\x9C\x15\x03\x02\x02\x02\x9D\xA6\x05\x02\x02\x02' +
    '\x9E\xA6\x05 \x11\x02\x9F\xA6\x05"\x12\x02\xA0\xA6\x05&\x14\x02\xA1\xA6' +
    '\x05$\x13\x02\xA2\xA6\x07\x0F\x02\x02\xA3\xA6\x05\x18\r\x02\xA4\xA6\x07' +
    '\x0E\x02\x02\xA5\x9D\x03\x02\x02\x02\xA5\x9E\x03\x02\x02\x02\xA5\x9F\x03' +
    '\x02\x02\x02\xA5\xA0\x03\x02\x02\x02\xA5\xA1\x03\x02\x02\x02\xA5\xA2\x03' +
    '\x02\x02\x02\xA5\xA3\x03\x02\x02\x02\xA5\xA4\x03\x02\x02\x02\xA6\x17\x03' +
    '\x02\x02\x02\xA7\xA8\x07\x0E\x02\x02\xA8\xA9\x07\v\x02\x02\xA9\xAA\x07' +
    '\x0E\x02\x02\xAA\x19\x03\x02\x02\x02\xAB\xAD\t\x03\x02\x02\xAC\xAE\x05' +
    '8\x1D\x02\xAD\xAC\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\xAF\x03' +
    '\x02\x02\x02\xAF\xB1\x05\x1C\x0F\x02\xB0\xB2\x058\x1D\x02\xB1\xB0\x03' +
    '\x02\x02\x02\xB1\xB2\x03\x02\x02\x02\xB2\xBD\x03\x02\x02\x02\xB3\xB5\x07' +
    '\x16\x02\x02\xB4\xB3\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02\xB5\xB7\x03' +
    '\x02\x02\x02\xB6\xB8\x058\x1D\x02\xB7\xB6\x03\x02\x02\x02\xB7\xB8\x03' +
    '\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\xBB\x05\x1C\x0F\x02\xBA\xBC\x05' +
    '8\x1D\x02\xBB\xBA\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBE\x03' +
    '\x02\x02\x02\xBD\xB4\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE\xBF\x03' +
    '\x02\x02\x02\xBF\xC0\t\x04\x02\x02\xC0\x1B\x03\x02\x02\x02\xC1\xC8\x05' +
    '"\x12\x02\xC2\xC8\x05&\x14\x02\xC3\xC8\x05$\x13\x02\xC4\xC8\x056\x1C' +
    '\x02\xC5\xC8\x05 \x11\x02\xC6\xC8\x07\x0E\x02\x02\xC7\xC1\x03\x02\x02' +
    '\x02\xC7\xC2\x03\x02\x02\x02\xC7\xC3\x03\x02\x02\x02\xC7\xC4\x03\x02\x02' +
    '\x02\xC7\xC5\x03\x02\x02\x02\xC7\xC6\x03\x02\x02\x02\xC8\x1D\x03\x02\x02' +
    '\x02\xC9\xCA\x07\x07\x02\x02\xCA\xCC\x05\b\x05\x02\xCB\xCD\x058\x1D\x02' +
    '\xCC\xCB\x03\x02\x02\x02\xCC\xCD\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02' +
    '\xCE\xCF\x07\b\x02\x02\xCF\x1F\x03\x02\x02\x02\xD0\xD1\t\x05\x02\x02\xD1' +
    '!\x03\x02\x02\x02\xD2\xD3\x07\x1E\x02\x02\xD3#\x03\x02\x02\x02\xD4\xD5' +
    "\x07 \x02\x02\xD5%\x03\x02\x02\x02\xD6\xD7\x07\x1F\x02\x02\xD7'\x03\x02" +
    '\x02\x02\xD8\xD9\t\x06\x02\x02\xD9)\x03\x02\x02\x02\xDA\xDC\x05,\x17\x02' +
    '\xDB\xDD\x05.\x18\x02\xDC\xDB\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02' +
    '\xDD\xE3\x03\x02\x02\x02\xDE\xE0\x05.\x18\x02\xDF\xE1\x05,\x17\x02\xE0' +
    '\xDF\x03\x02\x02\x02\xE0\xE1\x03\x02\x02\x02\xE1\xE3\x03\x02\x02\x02\xE2' +
    '\xDA\x03\x02\x02\x02\xE2\xDE\x03\x02\x02\x02\xE3+\x03\x02\x02\x02\xE4' +
    '\xE6\x07\x12\x02\x02\xE5\xE7\x07\x1B\x02\x02\xE6\xE5\x03\x02\x02\x02\xE6' +
    '\xE7\x03\x02\x02\x02\xE7-\x03\x02\x02\x02\xE8\xEA\x07\x13\x02\x02\xE9' +
    '\xEB\x07\x1B\x02\x02\xEA\xE9\x03\x02\x02\x02\xEA\xEB\x03\x02\x02\x02\xEB' +
    '/\x03\x02\x02\x02\xEC\xEE\x058\x1D\x02\xED\xEC\x03\x02\x02\x02\xED\xEE' +
    '\x03\x02\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\xF1\x07\x17\x02\x02\xF0\xF2' +
    '\x058\x1D\x02\xF1\xF0\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xF3' +
    '\x03\x02\x02\x02\xF3\xF9\x07\x19\x02\x02\xF4\xF6\x058\x1D\x02\xF5\xF4' +
    '\x03\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\xF9' +
    '\x07\x19\x02\x02\xF8\xED\x03\x02\x02\x02\xF8\xF5\x03\x02\x02\x02\xF91' +
    '\x03\x02\x02\x02\xFA\xFC\x058\x1D\x02\xFB\xFA\x03\x02\x02\x02\xFB\xFC' +
    '\x03\x02\x02\x02\xFC\xFD\x03\x02\x02\x02\xFD\xFE\x07\x17\x02\x02\xFE3' +
    '\x03\x02\x02\x02\xFF\u0101\x058\x1D\x02\u0100\xFF\x03\x02\x02\x02\u0100' +
    '\u0101\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u0102\u0103\x07\x18' +
    '\x02\x02\u01035\x03\x02\x02\x02\u0104\u0105\x07\x1C\x02\x02\u01057\x03' +
    '\x02\x02\x02\u0106\u0108\x07\x1A\x02\x02\u0107\u0106\x03\x02\x02\x02\u0108' +
    '\u0109\x03\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u0109\u010A\x03\x02' +
    '\x02\x02\u010A9\x03\x02\x02\x02,<BFLQZclpsx|\x7F\x82\x85\x8A\x8D\x90\x94' +
    '\x96\x9B\xA5\xAD\xB1\xB4\xB7\xBB\xBD\xC7\xCC\xDC\xE0\xE2\xE6\xEA\xED\xF1' +
    '\xF5\xF8\xFB\u0100\u0109';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!ElasticsearchGrammarParser.__ATN) {
      ElasticsearchGrammarParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(ElasticsearchGrammarParser._serializedATN)
      );
    }

    return ElasticsearchGrammarParser.__ATN;
  }
}

export class Range_termContext extends ParserRuleContext {
  public two_sided_range_term(): Two_sided_range_termContext | undefined {
    return this.tryGetRuleContext(0, Two_sided_range_termContext);
  }
  public one_sided_range_term(): One_sided_range_termContext | undefined {
    return this.tryGetRuleContext(0, One_sided_range_termContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_range_term;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterRange_term) {
      listener.enterRange_term(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitRange_term) {
      listener.exitRange_term(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitRange_term) {
      return visitor.visitRange_term(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class One_sided_range_termContext extends ParserRuleContext {
  public _op!: Token;
  public _val!: Range_valueContext;
  public range_value(): Range_valueContext {
    return this.getRuleContext(0, Range_valueContext);
  }
  public GT(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.GT, 0);
  }
  public GTE(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.GTE, 0);
  }
  public LT(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.LT, 0);
  }
  public LTE(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.LTE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_one_sided_range_term;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterOne_sided_range_term) {
      listener.enterOne_sided_range_term(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitOne_sided_range_term) {
      listener.exitOne_sided_range_term(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitOne_sided_range_term) {
      return visitor.visitOne_sided_range_term(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MainQContext extends ParserRuleContext {
  public _clause!: ClauseDefaultContext;
  public EOF(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.EOF, 0);
  }
  public clauseDefault(): ClauseDefaultContext {
    return this.getRuleContext(0, ClauseDefaultContext);
  }
  public sep(): SepContext[];
  public sep(i: number): SepContext;
  public sep(i?: number): SepContext | SepContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SepContext);
    } else {
      return this.getRuleContext(i, SepContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_mainQ;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterMainQ) {
      listener.enterMainQ(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitMainQ) {
      listener.exitMainQ(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitMainQ) {
      return visitor.visitMainQ(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ClauseDefaultContext extends ParserRuleContext {
  public clauseOr(): ClauseOrContext[];
  public clauseOr(i: number): ClauseOrContext;
  public clauseOr(i?: number): ClauseOrContext | ClauseOrContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ClauseOrContext);
    } else {
      return this.getRuleContext(i, ClauseOrContext);
    }
  }
  public sep(): SepContext[];
  public sep(i: number): SepContext;
  public sep(i?: number): SepContext | SepContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SepContext);
    } else {
      return this.getRuleContext(i, SepContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_clauseDefault;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterClauseDefault) {
      listener.enterClauseDefault(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitClauseDefault) {
      listener.exitClauseDefault(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitClauseDefault) {
      return visitor.visitClauseDefault(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ClauseOrContext extends ParserRuleContext {
  public clauseAnd(): ClauseAndContext[];
  public clauseAnd(i: number): ClauseAndContext;
  public clauseAnd(i?: number): ClauseAndContext | ClauseAndContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ClauseAndContext);
    } else {
      return this.getRuleContext(i, ClauseAndContext);
    }
  }
  public or_(): Or_Context[];
  public or_(i: number): Or_Context;
  public or_(i?: number): Or_Context | Or_Context[] {
    if (i === undefined) {
      return this.getRuleContexts(Or_Context);
    } else {
      return this.getRuleContext(i, Or_Context);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_clauseOr;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterClauseOr) {
      listener.enterClauseOr(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitClauseOr) {
      listener.exitClauseOr(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitClauseOr) {
      return visitor.visitClauseOr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ClauseAndContext extends ParserRuleContext {
  public clauseNot(): ClauseNotContext[];
  public clauseNot(i: number): ClauseNotContext;
  public clauseNot(i?: number): ClauseNotContext | ClauseNotContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ClauseNotContext);
    } else {
      return this.getRuleContext(i, ClauseNotContext);
    }
  }
  public and_(): And_Context[];
  public and_(i: number): And_Context;
  public and_(i?: number): And_Context | And_Context[] {
    if (i === undefined) {
      return this.getRuleContexts(And_Context);
    } else {
      return this.getRuleContext(i, And_Context);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_clauseAnd;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterClauseAnd) {
      listener.enterClauseAnd(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitClauseAnd) {
      listener.exitClauseAnd(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitClauseAnd) {
      return visitor.visitClauseAnd(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ClauseNotContext extends ParserRuleContext {
  public clauseBasic(): ClauseBasicContext[];
  public clauseBasic(i: number): ClauseBasicContext;
  public clauseBasic(i?: number): ClauseBasicContext | ClauseBasicContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ClauseBasicContext);
    } else {
      return this.getRuleContext(i, ClauseBasicContext);
    }
  }
  public not_(): Not_Context[];
  public not_(i: number): Not_Context;
  public not_(i?: number): Not_Context | Not_Context[] {
    if (i === undefined) {
      return this.getRuleContexts(Not_Context);
    } else {
      return this.getRuleContext(i, Not_Context);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_clauseNot;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterClauseNot) {
      listener.enterClauseNot(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitClauseNot) {
      listener.exitClauseNot(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitClauseNot) {
      return visitor.visitClauseNot(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ClauseBasicContext extends ParserRuleContext {
  public LPAREN(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.LPAREN, 0);
  }
  public clauseDefault(): ClauseDefaultContext | undefined {
    return this.tryGetRuleContext(0, ClauseDefaultContext);
  }
  public RPAREN(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.RPAREN, 0);
  }
  public sep(): SepContext[];
  public sep(i: number): SepContext;
  public sep(i?: number): SepContext | SepContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SepContext);
    } else {
      return this.getRuleContext(i, SepContext);
    }
  }
  public modifier(): ModifierContext | undefined {
    return this.tryGetRuleContext(0, ModifierContext);
  }
  public term_modifier(): Term_modifierContext | undefined {
    return this.tryGetRuleContext(0, Term_modifierContext);
  }
  public atom(): AtomContext | undefined {
    return this.tryGetRuleContext(0, AtomContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_clauseBasic;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterClauseBasic) {
      listener.enterClauseBasic(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitClauseBasic) {
      listener.exitClauseBasic(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitClauseBasic) {
      return visitor.visitClauseBasic(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AtomContext extends ParserRuleContext {
  public field(): FieldContext | undefined {
    return this.tryGetRuleContext(0, FieldContext);
  }
  public multi_value(): Multi_valueContext | undefined {
    return this.tryGetRuleContext(0, Multi_valueContext);
  }
  public modifier(): ModifierContext | undefined {
    return this.tryGetRuleContext(0, ModifierContext);
  }
  public term_modifier(): Term_modifierContext | undefined {
    return this.tryGetRuleContext(0, Term_modifierContext);
  }
  public value(): ValueContext | undefined {
    return this.tryGetRuleContext(0, ValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_atom;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterAtom) {
      listener.enterAtom(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitAtom) {
      listener.exitAtom(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitAtom) {
      return visitor.visitAtom(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FieldContext extends ParserRuleContext {
  public TERM_NORMAL(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.TERM_NORMAL, 0);
  }
  public COLON(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.COLON, 0);
  }
  public sep(): SepContext | undefined {
    return this.tryGetRuleContext(0, SepContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_field;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterField) {
      listener.enterField(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitField) {
      listener.exitField(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitField) {
      return visitor.visitField(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ValueContext extends ParserRuleContext {
  public range_term(): Range_termContext | undefined {
    return this.tryGetRuleContext(0, Range_termContext);
  }
  public normal(): NormalContext | undefined {
    return this.tryGetRuleContext(0, NormalContext);
  }
  public truncated(): TruncatedContext | undefined {
    return this.tryGetRuleContext(0, TruncatedContext);
  }
  public quoted(): QuotedContext | undefined {
    return this.tryGetRuleContext(0, QuotedContext);
  }
  public quoted_truncated(): Quoted_truncatedContext | undefined {
    return this.tryGetRuleContext(0, Quoted_truncatedContext);
  }
  public QMARK(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.QMARK, 0);
  }
  public anything(): AnythingContext | undefined {
    return this.tryGetRuleContext(0, AnythingContext);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.STAR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_value;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterValue) {
      listener.enterValue(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitValue) {
      listener.exitValue(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitValue) {
      return visitor.visitValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AnythingContext extends ParserRuleContext {
  public STAR(): TerminalNode[];
  public STAR(i: number): TerminalNode;
  public STAR(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(ElasticsearchGrammarParser.STAR);
    } else {
      return this.getToken(ElasticsearchGrammarParser.STAR, i);
    }
  }
  public COLON(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.COLON, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_anything;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterAnything) {
      listener.enterAnything(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitAnything) {
      listener.exitAnything(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitAnything) {
      return visitor.visitAnything(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Two_sided_range_termContext extends ParserRuleContext {
  public _start_type!: Token;
  public _a!: Range_valueContext;
  public _b!: Range_valueContext;
  public _end_type!: Token;
  public LBRACK(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.LBRACK, 0);
  }
  public LCURLY(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.LCURLY, 0);
  }
  public RBRACK(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.RBRACK, 0);
  }
  public RCURLY(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.RCURLY, 0);
  }
  public sep(): SepContext[];
  public sep(i: number): SepContext;
  public sep(i?: number): SepContext | SepContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SepContext);
    } else {
      return this.getRuleContext(i, SepContext);
    }
  }
  public range_value(): Range_valueContext[];
  public range_value(i: number): Range_valueContext;
  public range_value(i?: number): Range_valueContext | Range_valueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(Range_valueContext);
    } else {
      return this.getRuleContext(i, Range_valueContext);
    }
  }
  public TO(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.TO, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_two_sided_range_term;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterTwo_sided_range_term) {
      listener.enterTwo_sided_range_term(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitTwo_sided_range_term) {
      listener.exitTwo_sided_range_term(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitTwo_sided_range_term) {
      return visitor.visitTwo_sided_range_term(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Range_valueContext extends ParserRuleContext {
  public truncated(): TruncatedContext | undefined {
    return this.tryGetRuleContext(0, TruncatedContext);
  }
  public quoted(): QuotedContext | undefined {
    return this.tryGetRuleContext(0, QuotedContext);
  }
  public quoted_truncated(): Quoted_truncatedContext | undefined {
    return this.tryGetRuleContext(0, Quoted_truncatedContext);
  }
  public date(): DateContext | undefined {
    return this.tryGetRuleContext(0, DateContext);
  }
  public normal(): NormalContext | undefined {
    return this.tryGetRuleContext(0, NormalContext);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.STAR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_range_value;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterRange_value) {
      listener.enterRange_value(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitRange_value) {
      listener.exitRange_value(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitRange_value) {
      return visitor.visitRange_value(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Multi_valueContext extends ParserRuleContext {
  public LPAREN(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.LPAREN, 0);
  }
  public clauseDefault(): ClauseDefaultContext {
    return this.getRuleContext(0, ClauseDefaultContext);
  }
  public RPAREN(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.RPAREN, 0);
  }
  public sep(): SepContext | undefined {
    return this.tryGetRuleContext(0, SepContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_multi_value;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterMulti_value) {
      listener.enterMulti_value(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitMulti_value) {
      listener.exitMulti_value(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitMulti_value) {
      return visitor.visitMulti_value(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class NormalContext extends ParserRuleContext {
  public TERM_NORMAL(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.TERM_NORMAL, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.NUMBER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_normal;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterNormal) {
      listener.enterNormal(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitNormal) {
      listener.exitNormal(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitNormal) {
      return visitor.visitNormal(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TruncatedContext extends ParserRuleContext {
  public TERM_TRUNCATED(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.TERM_TRUNCATED, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_truncated;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterTruncated) {
      listener.enterTruncated(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitTruncated) {
      listener.exitTruncated(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitTruncated) {
      return visitor.visitTruncated(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Quoted_truncatedContext extends ParserRuleContext {
  public PHRASE_ANYTHING(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.PHRASE_ANYTHING, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_quoted_truncated;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterQuoted_truncated) {
      listener.enterQuoted_truncated(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitQuoted_truncated) {
      listener.exitQuoted_truncated(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitQuoted_truncated) {
      return visitor.visitQuoted_truncated(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class QuotedContext extends ParserRuleContext {
  public PHRASE(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.PHRASE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_quoted;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterQuoted) {
      listener.enterQuoted(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitQuoted) {
      listener.exitQuoted(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitQuoted) {
      return visitor.visitQuoted(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ModifierContext extends ParserRuleContext {
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.MINUS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_modifier;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterModifier) {
      listener.enterModifier(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitModifier) {
      listener.exitModifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitModifier) {
      return visitor.visitModifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Term_modifierContext extends ParserRuleContext {
  public boost(): BoostContext | undefined {
    return this.tryGetRuleContext(0, BoostContext);
  }
  public fuzzy(): FuzzyContext | undefined {
    return this.tryGetRuleContext(0, FuzzyContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_term_modifier;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterTerm_modifier) {
      listener.enterTerm_modifier(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitTerm_modifier) {
      listener.exitTerm_modifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitTerm_modifier) {
      return visitor.visitTerm_modifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BoostContext extends ParserRuleContext {
  public CARAT(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.CARAT, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.NUMBER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_boost;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterBoost) {
      listener.enterBoost(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitBoost) {
      listener.exitBoost(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitBoost) {
      return visitor.visitBoost(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FuzzyContext extends ParserRuleContext {
  public TILDE(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.TILDE, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.NUMBER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_fuzzy;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterFuzzy) {
      listener.enterFuzzy(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitFuzzy) {
      listener.exitFuzzy(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitFuzzy) {
      return visitor.visitFuzzy(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Not_Context extends ParserRuleContext {
  public AND(): TerminalNode | undefined {
    return this.tryGetToken(ElasticsearchGrammarParser.AND, 0);
  }
  public NOT(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.NOT, 0);
  }
  public sep(): SepContext[];
  public sep(i: number): SepContext;
  public sep(i?: number): SepContext | SepContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SepContext);
    } else {
      return this.getRuleContext(i, SepContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_not_;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterNot_) {
      listener.enterNot_(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitNot_) {
      listener.exitNot_(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitNot_) {
      return visitor.visitNot_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class And_Context extends ParserRuleContext {
  public AND(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.AND, 0);
  }
  public sep(): SepContext | undefined {
    return this.tryGetRuleContext(0, SepContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_and_;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterAnd_) {
      listener.enterAnd_(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitAnd_) {
      listener.exitAnd_(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitAnd_) {
      return visitor.visitAnd_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Or_Context extends ParserRuleContext {
  public OR(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.OR, 0);
  }
  public sep(): SepContext | undefined {
    return this.tryGetRuleContext(0, SepContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_or_;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterOr_) {
      listener.enterOr_(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitOr_) {
      listener.exitOr_(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitOr_) {
      return visitor.visitOr_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DateContext extends ParserRuleContext {
  public DATE_TOKEN(): TerminalNode {
    return this.getToken(ElasticsearchGrammarParser.DATE_TOKEN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_date;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterDate) {
      listener.enterDate(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitDate) {
      listener.exitDate(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitDate) {
      return visitor.visitDate(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SepContext extends ParserRuleContext {
  public WS(): TerminalNode[];
  public WS(i: number): TerminalNode;
  public WS(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(ElasticsearchGrammarParser.WS);
    } else {
      return this.getToken(ElasticsearchGrammarParser.WS, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return ElasticsearchGrammarParser.RULE_sep;
  }
  // @Override
  public enterRule(listener: ElasticsearchGrammarListener): void {
    if (listener.enterSep) {
      listener.enterSep(this);
    }
  }
  // @Override
  public exitRule(listener: ElasticsearchGrammarListener): void {
    if (listener.exitSep) {
      listener.exitSep(this);
    }
  }
  // @Override
  public accept<Result>(visitor: ElasticsearchGrammarVisitor<Result>): Result {
    if (visitor.visitSep) {
      return visitor.visitSep(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
