import { clean } from '../../helpers';
import { Canvas, Word } from './model';

// NOTE: temporary until parent id is included in scan data
export const getParentId = (id: string): string =>
  id.slice(0, id.lastIndexOf('/'));

export const findQueryTokens = (
  canvas: Canvas,
  queryStrings: string[]
): { tokens: Word[]; namedEntities: string[] } => {
  const tokens: Word[] = [];
  const namedEntities = new Set<string>();
  const terms = queryStrings.map((val) => val.toLowerCase().trim());

  canvas.annotations[0].items[0].body.regions.forEach((region) => {
    region.lines.forEach((line) => {
      line.words.forEach((token) => {
        const modernized = token.modernized && clean(token.modernized);
        const original = clean(token.original);

        if (token.named_entity) {
          namedEntities.add(token.named_entity);
        }

        const foundTerms = terms.some((term) => {
          const formattedTerm = clean(term);

          return (
            modernized?.includes(formattedTerm) ||
            original.includes(formattedTerm)
          );
        });

        if (foundTerms) {
          tokens.push(token);
        }
      });
    });
  });

  return {
    namedEntities: [...namedEntities],
    tokens,
  };
};
