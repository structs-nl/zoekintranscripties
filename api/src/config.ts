export interface Config {
  inventoryIndex: string;
  entityIndex: string;
  jsonLdContext: string;
  elasticUrl: string;
}

const config: Config = {
  inventoryIndex: 'inventory',
  entityIndex: 'entity',
  jsonLdContext: 'https://archief.nl/def/transcriptie/context.json',
  elasticUrl: process.env.ELASTIC_URL as string,
};

export default config;
