import { EntityResponseLD, Canvas, NamedEntity } from './model';
import { ResourceNotFoundError } from '../../helpers';
import { searchInventoryScanIds } from '../inventory/helpers';
import { getParentId, findQueryTokens } from './helpers';
import config from '../../config';
import { Client } from '@elastic/elasticsearch';
export class EntityService {
  /**
   * Retrieve a single entity from Elasticsearch
   */
  public async get(client: Client, id: string): Promise<EntityResponseLD> {
    const response = await client.get({
      index: config.entityIndex,
      id,
    });

    if (response.statusCode === 404) {
      throw new ResourceNotFoundError('Entity not found');
    }

    return {
      '@context': config.jsonLdContext,
      '@graph': [response.body._source.entity],
    };
  }

  /**
   * Retrieve a single entity from Elasticsearch within the context of a search
   * - Get the entity from elastic
   * - Get a list of all entities of the parent of this entity
   * - Get a list of all search results of the parent of this entity
   * - Based on these lists, return the previous and the next item/result in the jsonld
   */
  public async search(
    client: Client,
    id: string,
    query?: string
  ): Promise<EntityResponseLD> {
    const response = await client.get({
      index: config.entityIndex,
      id,
    });

    if (response.statusCode === 404) {
      throw new ResourceNotFoundError('Entity not found');
    }

    const { ids: originalIds } = await searchInventoryScanIds({
      id: getParentId(id),
      limit: 10000,
      offset: 0,
    });

    const { ids: resultIds, terms } = await searchInventoryScanIds({
      id: getParentId(id),
      query: query || undefined,
      limit: 10000,
      offset: 0,
    });

    const currentResultIndex = resultIds.indexOf(id);
    const currentIndex = originalIds.indexOf(id);

    const previousResults = query
      ? resultIds.filter((id) => originalIds.indexOf(id) < currentIndex)
      : [];
    const nextResults = query
      ? resultIds.filter((id) => originalIds.indexOf(id) > currentIndex)
      : [];

    const { namedEntities: namedEntityIds, tokens } = findQueryTokens(
      response.body._source.entity,
      terms
    );

    const namedEntityRequest = (namedEntityIds: string[]) =>
      namedEntityIds.length === 0
        ? Promise.resolve(undefined)
        : client.mget({
            index: config.entityIndex,
            body: {
              ids: namedEntityIds,
            },
          });

    const namedEntityResponse = await namedEntityRequest(namedEntityIds);

    const namedEntityMap = namedEntityResponse
      ? namedEntityResponse.body.docs
          .filter((doc: any) => doc.found === true)
          .map(
            (doc: { _source: { entity: NamedEntity } }) => doc._source.entity
          )
      : [];

    const canvas: Canvas = {
      currentResultIndex,
      currentIndex,
      previousResultId:
        previousResults.length > 0 &&
        previousResults[previousResults.length - 1],
      nextResultId: nextResults.length > 0 && nextResults[0],
      queryTokens: currentResultIndex !== -1 && tokens,
      previousId: originalIds[currentIndex - 1],
      nextId: originalIds[currentIndex + 1],
      ...response.body._source.entity,
    };

    return {
      '@context': config.jsonLdContext,
      '@graph': [canvas, ...namedEntityMap],
    };
  }
}
