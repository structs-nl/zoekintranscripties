import { Injectable } from '@angular/core';
import { DocumentResponseLD, Manifest } from '../models/document';
import {
  Canvas,
  PageResponseLD,
  AnnotationPainting,
  AnnotationSupplementing,
  Word,
  NamedEntity,
} from '../models/page';
import { RicoPipe } from '../pipes/rico.pipe';
import { getParamsFromUrl } from '../views/scan/scan.component';
import { IInventory, IToken, ITranscription } from './transcription.service';

enum Types {
  Inventory = 'inventory',
  Transcription = 'transcription',
  Canvas = 'Canvas',
}

export interface IResponseLD {
  '@graph': Array<IInventoryLD | ITranscriptionLD>;
}

export interface IInventoryLD {
  '@id': string;
  '@type': Types.Inventory;
  institution: string;
  accessnumber: string;
  inventorynumber: string;
  title: string;
  totalPages: number;
  pages: string[];
  handle?: string;
  archives: {
    value: string;
    parent?: string;
  }[];
}

export interface ITranscriptionLD {
  '@id': string;
  '@type': Types.Transcription;
  inventory_id: string;
  pagenr: number;
  image: string;
  image_width: number;
  image_height: number;
  tokens: IToken[];
}

export enum EntityType {
  Location = 'location',
  Person = 'person',
  Time = 'time',
}

@Injectable({
  providedIn: 'root',
})
export class JsonParserService {
  constructor(private rico: RicoPipe) {}

  parseInventory(manifest: Manifest): IInventory {
    const rico = this.rico.transform(manifest.seeAlso['rico:RecordSet']);
    const params = getParamsFromUrl(manifest['@id']);

    return {
      id: manifest['@id'],
      totalPages: manifest.totalPages as number,
      totalHits: manifest.totalHits as number,
      queryTerms: manifest.queryTerms,
      resultIds: manifest.resultIds,
      hierarchies: rico,
      items: manifest.items.map((item) => item['@id']),
      accessId: params.accessId,
      archiveName: params.archiveName,
      inventoryId: params.inventoryId,
    };
  }

  parseCanvas(
    canvas: Canvas,
    entityMap: Map<string, any> = new Map()
  ): ITranscription {
    const painting = canvas.items[0].items[0] as AnnotationPainting;
    const supplement = canvas.annotations[0]
      .items[0] as AnnotationSupplementing;

    if (!painting || !supplement) {
      throw new Error('No painting or supplement found on Canvas');
    }

    const getScanFromId = (id?: string): string | undefined =>
      id && id.slice(id.lastIndexOf('/') + 1);

    return {
      ...canvas,
      id: canvas['@id'],
      image_width: Number(canvas.width),
      image_height: Number(canvas.height),
      image: painting.body.service['@id'],
      defaultImage: painting.body['@id'],
      label: canvas.label,
      nextScanId: getScanFromId(canvas.nextId),
      nextResultScanId: getScanFromId(canvas.nextResultId),
      previousScanId: getScanFromId(canvas.previousId),
      previousResultScanId: getScanFromId(canvas.previousResultId),
      source: canvas['dcterms:source'],
      filename: canvas.items[0].items[0].body?.filename,
      queryTokens: !canvas.queryTokens
        ? []
        : canvas.queryTokens.map((token) => ({
            original: token.original,
            modernized: token.modernized,
            coords: token['geo:geometry']['geo:coordinates'],
          })),
      regions: supplement.body.regions.map((region) => ({
        coords: region['geo:geometry']['geo:coordinates'],
        lines: region.lines.map((line) =>
          line.words.map((word) => ({
            original: word.original,
            modernized: word.modernized,
            coords: word['geo:geometry']['geo:coordinates'],
            type: this.parseNamedEntityType(word, entityMap),
          }))
        ),
      })),
    };
  }

  parseNamedEntityType(
    word: Word,
    entityMap: Map<string, NamedEntity>
  ): EntityType | undefined {
    if (!word.named_entity) {
      return;
    }

    const namedEntity = entityMap.get(word.named_entity);

    if (!namedEntity) {
      return;
    }

    const map: Record<string, EntityType> = {
      'https://rdf.histograph.io/PlaceInTime': EntityType.Location,
      'pnv:PersonName': EntityType.Person,
      'xsd:dateTime': EntityType.Time,
    };

    return map[namedEntity['@type']];
  }

  parseInventoryResponse(
    response: DocumentResponseLD
  ): { inventory: IInventory; transcriptions: ITranscription[] } {
    const graph = response['@graph'];
    const manifest = graph.find(
      (node) => node['@type'] === 'Manifest'
    ) as Manifest;

    if (!manifest) {
      throw new Error('Response does not include manifest');
    }

    const transcriptions = graph
      .filter((node) => node['@type'] === 'Canvas')
      .map((canvas) => {
        return this.parseCanvas(canvas as Canvas);
      });

    return {
      inventory: this.parseInventory(manifest as Manifest),
      transcriptions,
    };
  }

  parseTranscriptionResponse(response: PageResponseLD): ITranscription {
    const canvas = response['@graph'].find(
      (node) => node['@type'] === Types.Canvas
    ) as Canvas;

    const entityMap = new Map<string, any>();

    response['@graph'].forEach((entity) => {
      entityMap.set(entity['@id'], entity);
    });

    return this.parseCanvas(canvas, entityMap);
  }
}
