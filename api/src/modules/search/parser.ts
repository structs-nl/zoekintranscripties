import { CharStreams, Token } from 'antlr4ts';
import { ElasticsearchGrammarLexer as GrammarLexer } from '../../grammar/ElasticsearchGrammarLexer';
import { normalizeExpansions } from './normalize';
import { client } from '../../helpers';
import { Expansion, RawSuggestionHit } from './model';

export const flattenSuggestions = (
  suggestions: Record<string, Expansion[]>
): Record<string, string[]> => {
  return Object.entries(suggestions).reduce(
    (list, [key, expansions]) => ({
      ...list,
      [key]: expansions
        .map((exp) => exp.synonym)
        .reduce(
          (arr: string[], currentArr: string[]) => [
            ...new Set([...arr, ...currentArr]),
          ],
          []
        ),
    }),
    {}
  );
};
export interface Match {
  synonyms: string[];
  term: string;
  token: Token;
  nextTilde?: string;
}

export const parseSuggestionHits = (
  hits: any[],
  matches: Match[],
  userExpansions: Record<string, string[]> = {}
): Match[] => {
  const updatedMatches: Match[] = matches;

  for (const hit of hits) {
    for (const match of matches) {
      const suggestion = hit._source.suggestion.toLowerCase();

      if (
        suggestion === match.term &&
        Object.keys(userExpansions).includes(suggestion)
      ) {
        for (const synonym of hit._source.synonym) {
          if (
            match.synonyms.indexOf(synonym) < 0 &&
            userExpansions[suggestion].includes(synonym)
          ) {
            match.synonyms.push(synonym);
          }
        }
        break;
      }
    }
  }

  return updatedMatches;
};

export const parseQuery = (query: string): Match[] => {
  try {
    const chars = CharStreams.fromString(query);
    const lexer = new GrammarLexer(chars);
    const matches: Match[] = [];
    const tokens = lexer.getAllTokens();

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];

      if (t.text === undefined) {
        continue;
      }

      let nextTilde = '';

      if (i + 1 < tokens.length && tokens[i + 1].type === GrammarLexer.TILDE) {
        nextTilde = tokens[i + 1].text as string;
      }

      if (t.type == GrammarLexer.TERM_NORMAL) {
        const term = t.text.toLowerCase();

        matches.push({
          token: t,
          term: term,
          synonyms: [],
          nextTilde,
        });
      }

      if (t.type == GrammarLexer.PHRASE) {
        const term = t.text.substring(1, t.text.length - 1).toLowerCase();

        matches.push({
          token: t,
          term: term,
          synonyms: [],
          nextTilde,
        });
      }
    }
    return matches;
  } catch (error) {
    console.log('Grammer error', error);
    // TODO: perhaps try to return a more specific error about the query
    throw new Error('Could not parse query');
  }
};

export const parseExpandedQuery = (input = '', matches: Match[]): string => {
  let pos = 0;
  let query = '';

  for (const match of matches) {
    // Get the prefix from the input string
    query += input.substring(pos, match.token.startIndex);
    pos = match.token.stopIndex + 1;

    // remove the tilde
    if (match.nextTilde) {
      pos += match.nextTilde.length;
    }

    // Generate disjunction or add term if there are no synonymss
    if (match.synonyms.length > 0) {
      let clause = '';
      for (const syn of match.synonyms) {
        if (clause.length == 0) {
          clause = ' ( "' + match.term + '"';
          clause += match.nextTilde;
          clause += ' OR ';
        } else {
          clause += ' OR ';
        }

        clause += ' "' + syn.toLowerCase() + '"';
        clause += match.nextTilde;
        clause += ' ';
      }
      clause += ' )';

      query += clause;
    } else {
      // Just add the text found if there are no synonyms
      query += match.token.text;
    }
  }

  // Append postfix
  query += input.substring(pos);

  return query;
};

export const fetchSuggestions = async (
  terms: string[]
): Promise<RawSuggestionHit[]> => {
  const result = await client.search(
    {
      index: 'suggestions',
      size: 10,
      body: {
        query: {
          terms: { suggestion: terms },
        },
      },
    },
    {
      ignore: [404],
      maxRetries: 2,
    }
  );

  return result.body.hits.hits;
};

interface ParsedQuery {
  terms: string[];
  expandedQuery: string;
  expansions: Record<string, Expansion[]>;
}

export const parseSearchQuery = async (
  query: string | undefined,
  userDefinedExpansions?: Record<string, string[]>
): Promise<ParsedQuery> => {
  const matches = parseQuery(query || '');
  const terms = matches.map((match) => match.term);
  const suggestions = await fetchSuggestions(terms);
  const expansions = normalizeExpansions(suggestions);
  const allExpansions = flattenSuggestions(expansions);

  const matchesWithSynonyms = parseSuggestionHits(
    suggestions,
    matches,
    userDefinedExpansions || allExpansions
  );

  const expandedQuery = parseExpandedQuery(query, matchesWithSynonyms);

  return {
    terms,
    expandedQuery,
    expansions,
  };
};
