/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DescriptionsController } from './../modules/descriptions/controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EntityController } from './../modules/entity/controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DocumentController } from './../modules/inventory/controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SearchController } from './../modules/search/controller';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Description: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        count: { dataType: 'double', required: true },
        label: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationImageBody: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['Image'], required: true },
      format: { dataType: 'string', required: true },
      service: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          profile: { dataType: 'string', required: true },
          '@type': { dataType: 'string', required: true },
          '@id': { dataType: 'string', required: true },
        },
        required: true,
      },
      height: { dataType: 'string', required: true },
      width: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationPainting: {
    dataType: 'refObject',
    properties: {
      '@type': { dataType: 'enum', enums: ['Annotation'], required: true },
      motivation: { dataType: 'enum', enums: ['painting'], required: true },
      body: { ref: 'AnnotationImageBody', required: true },
      target: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationPage_AnnotationPainting_: {
    dataType: 'refObject',
    properties: {
      type: { dataType: 'enum', enums: ['AnnotationPage'], required: true },
      items: {
        dataType: 'array',
        array: { ref: 'AnnotationPainting' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GeoGeometry: {
    dataType: 'refObject',
    properties: {
      'geo:type': { dataType: 'enum', enums: ['Polygon'], required: true },
      'geo:coordinates': {
        dataType: 'array',
        array: { dataType: 'array', array: { dataType: 'string' } },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Word: {
    dataType: 'refObject',
    properties: {
      'geo:geometry': { ref: 'GeoGeometry', required: true },
      original: { dataType: 'string', required: true },
      modernized: { dataType: 'string' },
      named_entity: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Line: {
    dataType: 'refObject',
    properties: {
      words: { dataType: 'array', array: { ref: 'Word' }, required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Region: {
    dataType: 'refObject',
    properties: {
      'geo:geometry': { ref: 'GeoGeometry', required: true },
      lines: { dataType: 'array', array: { ref: 'Line' }, required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationTextBody: {
    dataType: 'refObject',
    properties: {
      '@type': { dataType: 'enum', enums: ['Text'], required: true },
      regions: { dataType: 'array', array: { ref: 'Region' }, required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationSupplementing: {
    dataType: 'refObject',
    properties: {
      '@type': { dataType: 'enum', enums: ['Annotation'], required: true },
      motivation: {
        dataType: 'enum',
        enums: ['supplementing'],
        required: true,
      },
      body: { ref: 'AnnotationTextBody', required: true },
      target: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AnnotationPage_AnnotationSupplementing_: {
    dataType: 'refObject',
    properties: {
      type: { dataType: 'enum', enums: ['AnnotationPage'], required: true },
      items: {
        dataType: 'array',
        array: { ref: 'AnnotationSupplementing' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Canvas: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['Canvas'], required: true },
      label: { dataType: 'string', required: true },
      height: { dataType: 'double', required: true },
      width: { dataType: 'double', required: true },
      items: {
        dataType: 'array',
        array: { ref: 'AnnotationPage_AnnotationPainting_' },
        required: true,
      },
      annotations: {
        dataType: 'array',
        array: { ref: 'AnnotationPage_AnnotationSupplementing_' },
        required: true,
      },
      queryTokens: { dataType: 'array', array: { ref: 'Word' } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EntityDate: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['xsd:dateTime'], required: true },
      'dcterms:date': { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EntityName: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['pnv:PersonName'], required: true },
      literalName: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EntityPlace: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': {
        dataType: 'enum',
        enums: ['https://rdf.histograph.io/PlaceInTime'],
        required: true,
      },
      'rdfs:label': { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NamedEntity: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { ref: 'EntityDate' },
        { ref: 'EntityName' },
        { ref: 'EntityPlace' },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EntityResponseLD: {
    dataType: 'refObject',
    properties: {
      '@context': { dataType: 'string', required: true },
      '@graph': {
        dataType: 'array',
        array: {
          dataType: 'union',
          subSchemas: [{ ref: 'Canvas' }, { ref: 'NamedEntity' }],
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ValidateErrorJSON: {
    dataType: 'refObject',
    properties: {
      message: {
        dataType: 'enum',
        enums: ['Validation failed'],
        required: true,
      },
      details: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {},
        additionalProperties: { dataType: 'any' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NotFoundJSON: {
    dataType: 'refObject',
    properties: {
      message: { dataType: 'enum', enums: ['Not found'], required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  InternalServerErrorJSON: {
    dataType: 'refObject',
    properties: {
      message: {
        dataType: 'enum',
        enums: ['Something went wrong'],
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ManifestCanvas: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['Canvas'], required: true },
      label: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RicoRecord: {
    dataType: 'refObject',
    properties: {
      'rico:hasDocumentaryFormType': { dataType: 'string', required: true },
      'rico:identifier': { dataType: 'string', required: true },
      'rico:publishedBy': { dataType: 'string', required: true },
      'rico:managedBy': { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RicoRecordSet: {
    dataType: 'refObject',
    properties: {
      'rico:identifier': { dataType: 'string', required: true },
      'rico:title': { dataType: 'string', required: true },
      'rico:hasRecordSetType': { dataType: 'string', required: true },
      'rico:date': { dataType: 'string' },
      'html:p': { dataType: 'string' },
      'rico:isDescribedBy': { ref: 'RicoRecord' },
      'rico:includedIn': { ref: 'RicoRecordSet' },
      'rico:includes': { dataType: 'array', array: { ref: 'RicoRecordSet' } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Manifest: {
    dataType: 'refObject',
    properties: {
      '@id': { dataType: 'string', required: true },
      '@type': { dataType: 'enum', enums: ['Manifest'], required: true },
      label: { dataType: 'string', required: true },
      totalPages: { dataType: 'double' },
      items: {
        dataType: 'array',
        array: { ref: 'ManifestCanvas' },
        required: true,
      },
      queryTerms: { dataType: 'array', array: { dataType: 'string' } },
      seeAlso: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          'rico:recordSet': { ref: 'RicoRecordSet', required: true },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  InventoryResponseLD: {
    dataType: 'refObject',
    properties: {
      '@context': { dataType: 'string', required: true },
      '@graph': {
        dataType: 'array',
        array: {
          dataType: 'union',
          subSchemas: [{ ref: 'Canvas' }, { ref: 'Manifest' }],
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  InventoryBodyParams: {
    dataType: 'refObject',
    properties: {
      query: { dataType: 'string' },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Highlight: {
    dataType: 'refObject',
    properties: {
      page: { dataType: 'string' },
      text: { dataType: 'string', required: true },
      type: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['modern'] },
          { dataType: 'enum', enums: ['original'] },
          { dataType: 'enum', enums: ['description'] },
        ],
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SearchResult: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string', required: true },
      title: { dataType: 'string', required: true },
      date: {
        dataType: 'array',
        array: { dataType: 'string' },
        required: true,
      },
      archive: { dataType: 'string', required: true },
      access: { dataType: 'string', required: true },
      inventory: { dataType: 'string', required: true },
      totalHits: { dataType: 'double' },
      highlights: {
        dataType: 'array',
        array: { ref: 'Highlight' },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Bucket: {
    dataType: 'refObject',
    properties: {
      count: { dataType: 'double', required: true },
      label: { dataType: 'string', required: true },
      value: { dataType: 'string', required: true },
      hasChildren: { dataType: 'boolean' },
      children: { dataType: 'array', array: { ref: 'Bucket' } },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SearchAggregations: {
    dataType: 'refObject',
    properties: {
      nameTypes: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          buckets: {
            dataType: 'array',
            array: { ref: 'Bucket' },
            required: true,
          },
        },
      },
      histogram: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          buckets: {
            dataType: 'array',
            array: { ref: 'Bucket' },
            required: true,
          },
          interval: { dataType: 'string', required: true },
        },
        required: true,
      },
      descriptions: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {
          buckets: {
            dataType: 'array',
            array: { ref: 'Bucket' },
            required: true,
          },
        },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Record_string.Expansion-Array_': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {},
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SearchResults: {
    dataType: 'refObject',
    properties: {
      hits: {
        dataType: 'array',
        array: { ref: 'SearchResult' },
        required: true,
      },
      total: { dataType: 'double', required: true },
      aggregations: { ref: 'SearchAggregations', required: true },
      expansions: { ref: 'Record_string.Expansion-Array_' },
      query: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NameType: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['person'] },
        { dataType: 'enum', enums: ['location'] },
        { dataType: 'enum', enums: ['time'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SearchParams: {
    dataType: 'refObject',
    properties: {
      query: { dataType: 'string' },
      limit: { dataType: 'double' },
      offset: { dataType: 'double' },
      from: { dataType: 'double' },
      to: { dataType: 'double' },
      inventory: { dataType: 'string' },
      nameType: {
        dataType: 'array',
        array: { dataType: 'refAlias', ref: 'NameType' },
      },
      descriptionPrefix: { dataType: 'string' },
      descriptions: { dataType: 'array', array: { dataType: 'string' } },
      expansions: {
        dataType: 'nestedObjectLiteral',
        nestedProperties: {},
        additionalProperties: {
          dataType: 'array',
          array: { dataType: 'string' },
        },
      },
      sort: {
        dataType: 'union',
        subSchemas: [
          { dataType: 'enum', enums: ['relevance'] },
          { dataType: 'enum', enums: ['date-asc'] },
          { dataType: 'enum', enums: ['date-desc'] },
          { dataType: 'enum', enums: ['alphabet-asc'] },
          { dataType: 'enum', enums: ['alphabet-desc'] },
        ],
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get('/descriptions', function (request: any, response: any, next: any) {
    const args = {
      query: { in: 'query', name: 'query', required: true, dataType: 'string' },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new DescriptionsController();

    const promise = controller.searchDescription.apply(
      controller,
      validatedArgs as any
    );
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/entity', function (request: any, response: any, next: any) {
    const args = {
      id: { in: 'query', name: 'id', required: true, dataType: 'string' },
      requestBody: {
        in: 'body',
        name: 'requestBody',
        dataType: 'nestedObjectLiteral',
        nestedProperties: { query: { dataType: 'string' } },
      },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new EntityController();

    const promise = controller.searchEntity.apply(
      controller,
      validatedArgs as any
    );
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get('/entity', function (request: any, response: any, next: any) {
    const args = {
      id: { in: 'query', name: 'id', required: true, dataType: 'string' },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new EntityController();

    const promise = controller.getEntity.apply(
      controller,
      validatedArgs as any
    );
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/inventory', function (request: any, response: any, next: any) {
    const args = {
      id: { in: 'query', name: 'id', required: true, dataType: 'string' },
      limit: { in: 'query', name: 'limit', dataType: 'string' },
      offset: { in: 'query', name: 'offset', dataType: 'string' },
      requestBody: {
        in: 'body',
        name: 'requestBody',
        ref: 'InventoryBodyParams',
      },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new DocumentController();

    const promise = controller.get.apply(controller, validatedArgs as any);
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get('/inventory/list', function (request: any, response: any, next: any) {
    const args = {
      page: { in: 'query', name: 'page', dataType: 'string' },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new DocumentController();

    const promise = controller.list.apply(controller, validatedArgs as any);
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/search', function (request: any, response: any, next: any) {
    const args = {
      requestBody: {
        in: 'body',
        name: 'requestBody',
        required: true,
        ref: 'SearchParams',
      },
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    let validatedArgs: any[] = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
    } catch (err) {
      return next(err);
    }

    const controller = new SearchController();

    const promise = controller.search.apply(controller, validatedArgs as any);
    promiseHandler(controller, promise, response, undefined, next);
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus();
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === 'function' &&
      data.readable &&
      typeof data._read === 'function'
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
