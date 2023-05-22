import 'zone.js/node';

import * as dotenv from 'dotenv';

if (!process.versions?.['bun']) {
  dotenv.config();
}

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { ISRHandler } from 'ngx-isr';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { environment } from 'src/environments/environment';
import contentRoutes from './server-src/content/content.routes';
import mongoose from './server-src/helpers/db';
import bootstrap from './src/main.server';

console.log('mongoose.version: ', mongoose.version);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/phantom/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: process.env['INVALIDATE_TOKEN'] || 'MY_TOKEN',
    enableLogging: !environment.production
  });

  server.engine('html', ngExpressEngine({ bootstrap: bootstrap }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, { maxAge: '1y' }));

  server.use(express.json());
  server.use('/api/content', contentRoutes as express.Router);

  server.get(
    '*',
    // Serve page if it exists in cache
    async (req, res, next) => await isr.serveFromCache(req, res, next),
    // Server side render the page and add to cache if needed
    async (req, res, next) => await isr.render(req, res, next)
  );

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

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
