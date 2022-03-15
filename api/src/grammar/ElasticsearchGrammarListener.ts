// Generated from src/grammar/ElasticsearchGrammar.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { Range_termContext } from './ElasticsearchGrammarParser';
import { One_sided_range_termContext } from './ElasticsearchGrammarParser';
import { MainQContext } from './ElasticsearchGrammarParser';
import { ClauseDefaultContext } from './ElasticsearchGrammarParser';
import { ClauseOrContext } from './ElasticsearchGrammarParser';
import { ClauseAndContext } from './ElasticsearchGrammarParser';
import { ClauseNotContext } from './ElasticsearchGrammarParser';
import { ClauseBasicContext } from './ElasticsearchGrammarParser';
import { AtomContext } from './ElasticsearchGrammarParser';
import { FieldContext } from './ElasticsearchGrammarParser';
import { ValueContext } from './ElasticsearchGrammarParser';
import { AnythingContext } from './ElasticsearchGrammarParser';
import { Two_sided_range_termContext } from './ElasticsearchGrammarParser';
import { Range_valueContext } from './ElasticsearchGrammarParser';
import { Multi_valueContext } from './ElasticsearchGrammarParser';
import { NormalContext } from './ElasticsearchGrammarParser';
import { TruncatedContext } from './ElasticsearchGrammarParser';
import { Quoted_truncatedContext } from './ElasticsearchGrammarParser';
import { QuotedContext } from './ElasticsearchGrammarParser';
import { ModifierContext } from './ElasticsearchGrammarParser';
import { Term_modifierContext } from './ElasticsearchGrammarParser';
import { BoostContext } from './ElasticsearchGrammarParser';
import { FuzzyContext } from './ElasticsearchGrammarParser';
import { Not_Context } from './ElasticsearchGrammarParser';
import { And_Context } from './ElasticsearchGrammarParser';
import { Or_Context } from './ElasticsearchGrammarParser';
import { DateContext } from './ElasticsearchGrammarParser';
import { SepContext } from './ElasticsearchGrammarParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `ElasticsearchGrammarParser`.
 */
export interface ElasticsearchGrammarListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.range_term`.
   * @param ctx the parse tree
   */
  enterRange_term?: (ctx: Range_termContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.range_term`.
   * @param ctx the parse tree
   */
  exitRange_term?: (ctx: Range_termContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.one_sided_range_term`.
   * @param ctx the parse tree
   */
  enterOne_sided_range_term?: (ctx: One_sided_range_termContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.one_sided_range_term`.
   * @param ctx the parse tree
   */
  exitOne_sided_range_term?: (ctx: One_sided_range_termContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.mainQ`.
   * @param ctx the parse tree
   */
  enterMainQ?: (ctx: MainQContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.mainQ`.
   * @param ctx the parse tree
   */
  exitMainQ?: (ctx: MainQContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.clauseDefault`.
   * @param ctx the parse tree
   */
  enterClauseDefault?: (ctx: ClauseDefaultContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.clauseDefault`.
   * @param ctx the parse tree
   */
  exitClauseDefault?: (ctx: ClauseDefaultContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.clauseOr`.
   * @param ctx the parse tree
   */
  enterClauseOr?: (ctx: ClauseOrContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.clauseOr`.
   * @param ctx the parse tree
   */
  exitClauseOr?: (ctx: ClauseOrContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.clauseAnd`.
   * @param ctx the parse tree
   */
  enterClauseAnd?: (ctx: ClauseAndContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.clauseAnd`.
   * @param ctx the parse tree
   */
  exitClauseAnd?: (ctx: ClauseAndContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.clauseNot`.
   * @param ctx the parse tree
   */
  enterClauseNot?: (ctx: ClauseNotContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.clauseNot`.
   * @param ctx the parse tree
   */
  exitClauseNot?: (ctx: ClauseNotContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.clauseBasic`.
   * @param ctx the parse tree
   */
  enterClauseBasic?: (ctx: ClauseBasicContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.clauseBasic`.
   * @param ctx the parse tree
   */
  exitClauseBasic?: (ctx: ClauseBasicContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.atom`.
   * @param ctx the parse tree
   */
  enterAtom?: (ctx: AtomContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.atom`.
   * @param ctx the parse tree
   */
  exitAtom?: (ctx: AtomContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.field`.
   * @param ctx the parse tree
   */
  enterField?: (ctx: FieldContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.field`.
   * @param ctx the parse tree
   */
  exitField?: (ctx: FieldContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.value`.
   * @param ctx the parse tree
   */
  enterValue?: (ctx: ValueContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.value`.
   * @param ctx the parse tree
   */
  exitValue?: (ctx: ValueContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.anything`.
   * @param ctx the parse tree
   */
  enterAnything?: (ctx: AnythingContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.anything`.
   * @param ctx the parse tree
   */
  exitAnything?: (ctx: AnythingContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.two_sided_range_term`.
   * @param ctx the parse tree
   */
  enterTwo_sided_range_term?: (ctx: Two_sided_range_termContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.two_sided_range_term`.
   * @param ctx the parse tree
   */
  exitTwo_sided_range_term?: (ctx: Two_sided_range_termContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.range_value`.
   * @param ctx the parse tree
   */
  enterRange_value?: (ctx: Range_valueContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.range_value`.
   * @param ctx the parse tree
   */
  exitRange_value?: (ctx: Range_valueContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.multi_value`.
   * @param ctx the parse tree
   */
  enterMulti_value?: (ctx: Multi_valueContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.multi_value`.
   * @param ctx the parse tree
   */
  exitMulti_value?: (ctx: Multi_valueContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.normal`.
   * @param ctx the parse tree
   */
  enterNormal?: (ctx: NormalContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.normal`.
   * @param ctx the parse tree
   */
  exitNormal?: (ctx: NormalContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.truncated`.
   * @param ctx the parse tree
   */
  enterTruncated?: (ctx: TruncatedContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.truncated`.
   * @param ctx the parse tree
   */
  exitTruncated?: (ctx: TruncatedContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.quoted_truncated`.
   * @param ctx the parse tree
   */
  enterQuoted_truncated?: (ctx: Quoted_truncatedContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.quoted_truncated`.
   * @param ctx the parse tree
   */
  exitQuoted_truncated?: (ctx: Quoted_truncatedContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.quoted`.
   * @param ctx the parse tree
   */
  enterQuoted?: (ctx: QuotedContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.quoted`.
   * @param ctx the parse tree
   */
  exitQuoted?: (ctx: QuotedContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.modifier`.
   * @param ctx the parse tree
   */
  enterModifier?: (ctx: ModifierContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.modifier`.
   * @param ctx the parse tree
   */
  exitModifier?: (ctx: ModifierContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.term_modifier`.
   * @param ctx the parse tree
   */
  enterTerm_modifier?: (ctx: Term_modifierContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.term_modifier`.
   * @param ctx the parse tree
   */
  exitTerm_modifier?: (ctx: Term_modifierContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.boost`.
   * @param ctx the parse tree
   */
  enterBoost?: (ctx: BoostContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.boost`.
   * @param ctx the parse tree
   */
  exitBoost?: (ctx: BoostContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.fuzzy`.
   * @param ctx the parse tree
   */
  enterFuzzy?: (ctx: FuzzyContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.fuzzy`.
   * @param ctx the parse tree
   */
  exitFuzzy?: (ctx: FuzzyContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.not_`.
   * @param ctx the parse tree
   */
  enterNot_?: (ctx: Not_Context) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.not_`.
   * @param ctx the parse tree
   */
  exitNot_?: (ctx: Not_Context) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.and_`.
   * @param ctx the parse tree
   */
  enterAnd_?: (ctx: And_Context) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.and_`.
   * @param ctx the parse tree
   */
  exitAnd_?: (ctx: And_Context) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.or_`.
   * @param ctx the parse tree
   */
  enterOr_?: (ctx: Or_Context) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.or_`.
   * @param ctx the parse tree
   */
  exitOr_?: (ctx: Or_Context) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.date`.
   * @param ctx the parse tree
   */
  enterDate?: (ctx: DateContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.date`.
   * @param ctx the parse tree
   */
  exitDate?: (ctx: DateContext) => void;

  /**
   * Enter a parse tree produced by `ElasticsearchGrammarParser.sep`.
   * @param ctx the parse tree
   */
  enterSep?: (ctx: SepContext) => void;
  /**
   * Exit a parse tree produced by `ElasticsearchGrammarParser.sep`.
   * @param ctx the parse tree
   */
  exitSep?: (ctx: SepContext) => void;
}
