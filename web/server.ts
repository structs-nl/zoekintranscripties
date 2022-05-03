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
    const requestAsync = util.promisify(request);
    const { body } = await requestAsync({
      uri: `${environment.apiBaseUrl}/inventory/list`,
    });

    const inventories = JSON.parse(body) as string[];

    const urlset = [
      {
        urlset: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
            },
          },
          {
            url: [
              {
                loc: `https://www.zoekintranscripties.nl/`,
              },
            ],
          },
          ...inventories.map((inventory) => ({
            url: [
              {
                loc: `https://www.zoekintranscripties.nl/zoeken/document?id=${inventory}`,
              },
            ],
          })),
        ],
      },
    ];

    res.set('Content-Type', 'text/xml');
    res.send(xml(urlset));
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
