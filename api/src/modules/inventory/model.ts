import { Canvas } from '../entity/model';

export interface InventoryBodyParams {
  query?: string;
}

export interface InventoryParams extends InventoryBodyParams {
  id: string;
  limit: number;
  offset: number;
}

export interface InventoryResponseLD {
  '@context': string;
  '@graph': Array<Canvas | Manifest>;
}

export interface Manifest {
  '@id': string;
  '@type': 'Manifest';
  label: string;
  totalPages?: number;
  items: ManifestCanvas[];
  queryTerms?: string[];
  seeAlso: {
    'rico:recordSet': RicoRecordSet;
  };
}

export interface ManifestCanvas {
  '@id': string;
  '@type': 'Canvas';
  label: string;
}

export interface RicoRecordSet {
  'rico:identifier': string;
  'rico:title': string;
  'rico:hasRecordSetType': string;
  'rico:date'?: string;
  'html:p'?: string;
  'rico:isDescribedBy'?: RicoRecord;
  'rico:includedIn'?: RicoRecordSet;
  'rico:includes'?: RicoRecordSet[];
}

export interface RicoRecord {
  'rico:hasDocumentaryFormType': string;
  'rico:identifier': string;
  'rico:publishedBy': string;
  'rico:managedBy': string;
}
