import { Canvas } from './page';

export interface DocumentParams {
  id: string;
  limit: number;
  offset: number;
  query?: string | undefined;
}

export interface DocumentResponseLD {
  '@context': string;
  '@graph': Array<Canvas | Manifest>;
}

export interface Manifest {
  '@id': string;
  '@type': 'Manifest';
  label: string;
  totalPages?: number;
  totalHits?: number;
  queryTerms?: string[];
  resultIds?: string[];
  items: ManifestCanvas[];
  seeAlso: {
    'rico:RecordSet': RicoRecordSet;
  };
}

export interface ManifestCanvas {
  '@id': string;
  '@type': 'Canvas';
  label: string;
}

export interface RicoRecordSet {
  'rico:identifier'?: string;
  'rico:title'?: string;
  'rico:hasRecordSetType'?: string;
  'rico:includedIn'?: RicoRecordSet;
  'rico:date'?: string;
  'html:p'?: string;
  'rico:isDescribedBy'?: RicoRecord;
  'rico:includes'?: RicoRecordSet[];
  'rico:RecordSet'?: RicoRecordSet;
}

export interface RicoRecord {
  'rico:hasDocumentaryFormType': string;
  'rico:identifier': string;
  'rico:publishedBy': string;
  'rico:managedBy': string;
  'rico:Record': RicoRecord;
}
