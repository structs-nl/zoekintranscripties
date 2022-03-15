import express, { Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'path';
import compression from 'compression';
import { RegisterRoutes } from './routes/routes';
import { notFoundHandler, loggingMiddleware, errorHandler } from './helpers';
import swaggerJSON from './routes/swagger.json';

const app = express();
const documentationFolder = join(process.cwd(), 'docs');

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(loggingMiddleware);

app.get('/docs/swagger.json', async (request: Request, response: Response) => {
  return response.send(swaggerJSON);
});

app.use('/documentation', express.static(documentationFolder));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSON, {
    swaggerOptions: {
      syntaxHighlight: false,
    },
  })
);

RegisterRoutes(app);

app.use(errorHandler);
app.use(notFoundHandler);

export { app };
