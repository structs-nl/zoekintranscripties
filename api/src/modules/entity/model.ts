export interface EntityResponseLD {
  '@context': string;
  '@graph': Array<Canvas | NamedEntity>;
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

export interface Canvas {
  '@id': string;
  '@type': 'Canvas';
  label: string;
  height: number;
  width: number;
  items: AnnotationPage<AnnotationPainting>[];
  annotations: AnnotationPage<AnnotationSupplementing>[];
  queryTokens?: Word[];
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
  modernized?: string;
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
  height: string; // TODO: should be number
  width: string; // TODO: should be number
}

export interface GeoGeometry {
  'geo:type': 'Polygon';
  'geo:coordinates': Array<string[]>;
}
