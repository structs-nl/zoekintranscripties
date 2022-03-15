import { Client } from '@elastic/elasticsearch';
import {
  InventoryResponseLD,
  InventoryParams,
  Manifest,
  ManifestCanvas,
} from './model';
import { ResourceNotFoundError } from '../../helpers';
import { Canvas } from '../entity/model';
import { fetchCanvasEntities, searchInventoryScanIds } from './helpers';
import config from '../../config';

export class InventoryService {
  /**
   * Returns the inventory with transcriptions
   * - Retrieve inventory from Elasticsearch
   * - Search through all scans within the inventory and return found terms and scan ids
   * - Fetch the entity for each relevant scan and add a list of each word in a scan that matches a query term
   * - Build the jsonld response and return it
   */
  public async get(
    client: Client,
    params: InventoryParams
  ): Promise<InventoryResponseLD> {
    const inventory = await client.get({
      index: config.entityIndex,
      id: params.id,
    });

    const {
      terms,
      totalHits,
      ids: resultScanIds,
    } = await searchInventoryScanIds(params);

    if (!inventory) {
      throw new ResourceNotFoundError(`Inventory not found: ${params.id}`);
    }

    const ids = inventory.body._source.entity.items
      .slice(params.offset, params.offset + params.limit)
      .map((item: ManifestCanvas) => item['@id']);

    const manifest: Manifest = {
      ...inventory.body._source.entity,
      totalPages: inventory.body._source.entity.items.length,
      queryTerms: terms,
      totalHits,
      resultIds: resultScanIds,
    };

    const canvasList = await fetchCanvasEntities(ids, terms);
    const graph: Array<Manifest | Canvas> = [manifest, ...canvasList];

    return {
      '@context': config.jsonLdContext,
      '@graph': graph,
    };
  }

  public async list(
    client: Client,
    params: { page: number; size: number }
  ): Promise<string[]> {
    const inventories = await client.search({
      index: config.inventoryIndex,
      body: {
        _source: false,
        from: params.page * params.size,
        size: params.size,
        stored_fields: ['id'],
        query: {
          match_all: {},
        },
      },
    });

    return inventories.body.hits.hits.map((hit: any) => hit._id);
  }
}
