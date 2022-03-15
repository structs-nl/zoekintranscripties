export interface DocumentResponseLD {
  versie: string;
  '@context': string;
  '@graph': Array<Canvas | Manifest | EntityName | EntityDate | EntityPlace>;
}

export type NamedEntity = EntityDate | EntityName | EntityPlace;

export interface EntityName {
  '@id': string;
  '@type': 'pnv:PersonName';
  literalName: string;
}

export interface EntityDate {
  '@id': string;
  '@type': 'xsd:dateTime';
  'dcterms:date': string;
}

export interface EntityPlace {
  '@id': string;
  '@type': 'https://rdf.histograph.io/PlaceInTime';
  'rdfs:label': string;
}

export interface Manifest {
  '@id': string;
  '@type': 'Manifest';
  label: string;
  items: ManifestCanvas[];
  // TODO: find out why there is no schema error when this property is left out
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
  'rico:heldBy'?: string;
  'rico:isDescribedBy'?: RicoRecord;
  'rico:includes'?: RicoRecordSet[];
  'rico:RecordSet'?: RicoRecordSet;
}

export interface RicoRecord {
  'rico:hasDocumentaryFormType'?: string;
  'rico:identifier'?: string;
  'rico:publishedBy'?: string;
  'rico:managedBy'?: string;
  'rico:Record'?: RicoRecord;
}

export interface Canvas {
  '@id': string;
  '@type': 'Canvas';
  label: string;
  height: number;
  width: number;
  items: AnnotationPage<AnnotationPainting>[];
  annotations: AnnotationPage<AnnotationSupplementing>[];
}

export interface AnnotationPage<Annotation> {
  type: 'AnnotationPage';
  items: Annotation[];
}

export interface AnnotationPainting {
  '@type': 'Annotation';
  motivation: 'painting';
  body: AnnotationImageBody;
  target: string;
}

export interface AnnotationSupplementing {
  '@type': 'Annotation';
  motivation: 'supplementing';
  body: AnnotationTextBody;
  target: string;
}

export interface AnnotationTextBody {
  '@type': 'Text';
  regions: Region[];
}

export interface Region {
  'geo:geometry': GeoGeometry;
  lines: Line[];
}

export interface Line {
  words: Word[];
}

export interface Word {
  'geo:geometry': GeoGeometry;
  original: string;
  modernized: string;
  named_entity?: string;
}

export interface AnnotationImageBody {
  '@id': string;
  '@type': 'Image';
  format: string;
  service: {
    '@id': string;
    '@type': string;
    profile: string;
  };
  height: number;
  width: number;
}

export interface GeoGeometry {
  'geo:type': 'Polygon';
  'geo:coordinates': Array<number[]>;
}
