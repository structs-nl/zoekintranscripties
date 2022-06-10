import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import compression from 'compression';
import xml from 'xml';
import util from 'util';
import { join } from 'path';
import request from 'request';
import { environment } from './src/environments/environment';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import domino from 'domino';
import {
  getIdFromParams,
  getParamsFromUrl,
} from 'src/app/views/scan/scan.component';

const requestAsync = util.promisify(request.get);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/web/browser');
  const documentationFolder = join(process.cwd(), 'docs');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
  const win = domino.createWindow(indexHtml);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.window = win as any;
  global.document = win.document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global['CSS'] = null as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global['requestAnimationFrame'] = (callback: any): any => {
    let lastTime = 0;
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  global['cancelAnimationFrame'] = (id) => {
    clearTimeout(id);
  };

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.use(compression());
  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use('/documentation', express.static(documentationFolder));

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  server.get('/sitemap.xml', async (req, res) => {
    const { body } = await requestAsync({
      url: `${environment.apiBaseUrl}/inventory/list`,
      strictSSL: false,
    });

    const inventories = JSON.parse(body) as string[];

    const getUrlFromId = (id: string): string => {
      const params = getParamsFromUrl(id);

      return `https://zoekintranscripties.nl/${params.archiveName}--${params.accessId}--${params.inventoryId}.xml`;
    };

    const sitemaps = [
      {
        sitemapindex: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            },
          },
          ...inventories.map((inventory) => ({
            sitemap: [
              {
                loc: getUrlFromId(inventory),
              },
            ],
          })),
        ],
      },
    ];

    res.set('Content-Type', 'text/xml');
    res.send(xml(sitemaps, { declaration: true }));
  });

  server.get('/:id.xml', async (req, res) => {
    const [archiveName, accessId, inventoryId] = req.params.id.split('--');
    const id = getIdFromParams({
      archiveName,
      inventoryId,
      accessId,
    });

    const { body } = await requestAsync({
      url: `${environment.apiBaseUrl}/entity?id=${id}`,
      strictSSL: false,
    });

    const document = JSON.parse(body) as any;
    const manifest = document['@graph'].find(
      (item: any) => item['@type'] === 'Manifest'
    );

    if (!manifest) {
      res.send('error');
      return;
    }

    const urlset = [
      {
        urlset: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
              'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
              'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              'xsi:schemaLocation':
                'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
            },
          },
          {
            url: [
              {
                loc: `https://zoekintranscripties.nl/document/${archiveName}/${accessId}/${inventoryId}`,
              },
            ],
          },
          ...manifest.items.map((item: any) => ({
            url: [
              {
                loc: `https://zoekintranscripties.nl/document/${archiveName}/${accessId}/${inventoryId}/${item.label}`,
              },
            ],
          })),
        ],
      },
    ];

    res.set('Content-Type', 'text/xml');
    res.send(xml(urlset, { declaration: true }));
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');

    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
