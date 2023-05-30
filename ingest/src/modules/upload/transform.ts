import transformRico from './transform-rico';
import {
  Canvas,
  DocumentResponseLD,
  Manifest,
  NamedEntity,
  EntityPlace,
  EntityName,
} from './model';
import config from '../../config';

export interface Inventory {
  id: string;
  date: number[];
  archive_label: string;
  archive_id: string;
  archive_title: string;
  access_label: string;
  access_id: string;
  access_title: string;
  inventory_label: string;
  inventory_id: string;
  inventory_title: string;
  document_type: string;
  nest: Array<NestedDocument>;
}
export interface NestedDescription {
  description_path: string;
  description_title: string;
  description_text: string;
}

export interface NestedPage {
  page_id: string;
  page_nr: string;
  page_text: string;
  page_text_modernized: string;
  entity_person: string[];
  entity_location: string[];
  entity_time: string[];
}

export type NestedDocument = NestedDescription | NestedPage;

export const range = (from: number, to: number): number[] => {
  if (from === to) {
    return [from];
  }

  const arr: number[] = [];

  for (let i = from; i < to; i += 1) {
    arr.push(i);
  }

  return arr;
};

export const transformCanvas = (entity: Canvas, graph: any[]): NestedPage => {
  const persons = new Set<string>();
  const places = new Set<string>();
  const dateTimes = new Set<string>();
  let original = '';
  let modernized = '';

  entity.annotations.forEach((entity) => {
    entity.items.forEach((annotation) => {
      annotation.body.regions.forEach((region) => {
        let lineCount = 0;

        region.lines.forEach((line) => {
          let wordCount = 0;
          lineCount++;

          if (lineCount < region.lines.length) {
            if (original.length > 0) {
              original += '\n';
            }

            if (modernized.length > 0) {
              modernized += '\n';
            }
          }

          line.words.forEach((word) => {
            wordCount++;

            original += word.original;
            modernized += word.modernized || '';

            if (wordCount < line.words.length) {
              original += ' ';
              modernized += ' ';
            }

            if (word.named_entity) {
              const namedEntity: NamedEntity = graph.find(
                (entity) => entity['@id'] === word.named_entity
              );

              if (namedEntity) {
                switch (namedEntity['@type']) {
                  case 'xsd:dateTime': {
                    if (namedEntity['dcterms:date']) {
                      dateTimes.add(namedEntity['dcterms:date']);
                    }
                  }

                  case 'https://rdf.histograph.io/PlaceInTime': {
                    if ((namedEntity as EntityPlace)['rdfs:label']) {
                      places.add((namedEntity as EntityPlace)['rdfs:label']);
                    }
                  }

                  case 'pnv:PersonName': {
                    if ((namedEntity as EntityName).literalName) {
                      persons.add((namedEntity as EntityName).literalName);
                    }
                  }
                }
              }
            }
          });
        });
      });
    });
  });

  return {
    page_id: entity['@id'],
    page_nr: entity.label,
    page_text_modernized: modernized,
    page_text: original,
    entity_person: [...persons],
    entity_location: [...places],
    entity_time: [...dateTimes],
  };
};

const transformManifest = (entity: Manifest): Inventory | undefined => {
  let title = '';
  let lowestTitle = '';

  const nest: any[] = [];

  const { dateList, propList } = transformRico(
    entity.seeAlso['rico:RecordSet']
  );

  if (propList.length === 0) {
    return;
  }

  propList.forEach((prop, index) => {
    if (prop.id === propList[propList.length - 1].id) {
      if (prop.title === undefined) {
        return;
      }

      const t = prop.title.trim();

      if (t.length > 0) {
        if (title.trim().length > 0) {
          title = `${title} | ${t}`;
        } else {
          title = t;
        }
      }
    } else {
      if (prop.title && prop.title.trim().length > 0) {
        lowestTitle = prop.title;
      }

      nest.push({
        description_path: prop.path,
        description_title:
          index === 0 ? prop.title : `${prop.id} - ${prop.title}`,
        description_text: `${prop.id} - ${prop.title}`,
      });
    }
  });

  const doc = {
    id: propList[0].id as string,
    date: range(Math.min(...dateList), Math.max(...dateList)),
    archive_title: propList[0].title as string,
    archive_id: propList[0].id as string,
    archive_label: `${propList[0].title} (${propList[0].id})` as string,

    access_title: propList[1].title as string,
    access_id: propList[1].id as string,
    access_label: `${propList[1].title} - ${propList[1].id}` as string,

    inventory_id: propList[propList.length - 1].id as string,
    inventory_title: title.length === 0 ? lowestTitle : title,
    inventory_label: `${propList[1]['title']} | ${
      propList[propList.length - 1].id
    } | ${title}`,

    document_type: '',
    nest,
  };

  return doc;
};

export const transformToElasticBulk = (
  documentResponse: DocumentResponseLD
): { id?: string; bulk: unknown[] } => {
  let id;
  const bulk = [];
  const document: Inventory = {
    id: '',
    date: [],
    archive_label: '',
    archive_id: '',
    archive_title: '',
    access_label: '',
    access_id: '',
    access_title: '',
    inventory_label: '',
    inventory_id: '',
    inventory_title: '',
    document_type: '',
    nest: [],
  };

  for (let index = 0; index < documentResponse['@graph'].length; index++) {
    // NOTE: what to do with other entries such as named entities?
    if ('@type' in documentResponse['@graph'][index] === undefined) {
      continue;
    }

    const entity = documentResponse['@graph'][index] as Canvas | Manifest;

    bulk.push(
      {
        index: { _index: config.entityIndex, _id: entity['@id'].toLowerCase() },
      },
      { entity }
    );

    switch (entity['@type']) {
      case 'Canvas':
        document.nest.push(transformCanvas(entity, documentResponse['@graph']));
        break;

      case 'Manifest': {
        id = entity['@id'].toLowerCase();

        const transcriptionDoc = transformManifest(entity as Manifest);

        console.log('🧨', JSON.stringify(transcriptionDoc, null, 2));

        if (transcriptionDoc === undefined) {
          throw new Error('No valid manifest');
        }

        document.id = id.toLowerCase();
        document.date = transcriptionDoc.date;
        document.archive_label = transcriptionDoc.archive_label;
        document.archive_id = transcriptionDoc.archive_id;
        document.archive_title = transcriptionDoc.archive_title;
        document.access_label = transcriptionDoc.access_label;
        document.access_id = transcriptionDoc.access_id;
        document.access_title = transcriptionDoc.access_title;
        document.inventory_label = transcriptionDoc.inventory_label;
        document.inventory_id = transcriptionDoc.inventory_id;
        document.inventory_title = transcriptionDoc.inventory_title;
        document.document_type = transcriptionDoc.document_type;
        document.nest = transcriptionDoc.nest;

        break;
      }

      default: {
        bulk.push(
          {
            index: {
              _index: config.entityIndex,
              _id: (entity['@id'] as string).toLowerCase(),
            },
          },
          { entity }
        );
      }
    }
  }

  bulk.push(
    { index: { _index: config.inventoryIndex, _id: id?.toLowerCase() } },
    document
  );

  return { id, bulk };
};

export const splitIntoChunks = (
  array: unknown[],
  chunkSize: number
): unknown[][] => {
  const chunks = [];

  for (let i = 0, j = array.length; i < j; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
};
