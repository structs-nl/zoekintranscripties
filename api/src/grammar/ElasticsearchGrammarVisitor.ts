// Generated from src/grammar/ElasticsearchGrammar.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ElasticsearchGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ElasticsearchGrammarVisitor<Result>
  extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.range_term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRange_term?: (ctx: Range_termContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.one_sided_range_term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOne_sided_range_term?: (ctx: One_sided_range_termContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.mainQ`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMainQ?: (ctx: MainQContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.clauseDefault`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClauseDefault?: (ctx: ClauseDefaultContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.clauseOr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClauseOr?: (ctx: ClauseOrContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.clauseAnd`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClauseAnd?: (ctx: ClauseAndContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.clauseNot`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClauseNot?: (ctx: ClauseNotContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.clauseBasic`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClauseBasic?: (ctx: ClauseBasicContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.atom`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAtom?: (ctx: AtomContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.field`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitField?: (ctx: FieldContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitValue?: (ctx: ValueContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.anything`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnything?: (ctx: AnythingContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.two_sided_range_term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTwo_sided_range_term?: (ctx: Two_sided_range_termContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.range_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRange_value?: (ctx: Range_valueContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.multi_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMulti_value?: (ctx: Multi_valueContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.normal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNormal?: (ctx: NormalContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.truncated`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTruncated?: (ctx: TruncatedContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.quoted_truncated`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuoted_truncated?: (ctx: Quoted_truncatedContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.quoted`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuoted?: (ctx: QuotedContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.modifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModifier?: (ctx: ModifierContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.term_modifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTerm_modifier?: (ctx: Term_modifierContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.boost`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBoost?: (ctx: BoostContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.fuzzy`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFuzzy?: (ctx: FuzzyContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.not_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNot_?: (ctx: Not_Context) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.and_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnd_?: (ctx: And_Context) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.or_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOr_?: (ctx: Or_Context) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDate?: (ctx: DateContext) => Result;

  /**
   * Visit a parse tree produced by `ElasticsearchGrammarParser.sep`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSep?: (ctx: SepContext) => Result;
}
