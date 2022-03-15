import express, { Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import { join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { RegisterRoutes } from './routes/routes';
import { errorHandler } from './helpers';
// import overloadProtect from 'overload-protection';

const app = express();
const documentationFolder = join(process.cwd(), 'docs');

// NOTE: do not use overload protection on the google cloud, only on a self-managed vps
// app.use(overloadProtect('express'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/docs/swagger.json', async (request: Request, response: Response) => {
  return response.send(await import('./routes/swagger.json'));
});

app.use('/documentation', express.static(documentationFolder));

app.use(
  '/docs',
  swaggerUi.serve,
  async (request: Request, response: Response) => {
    return response.send(
      swaggerUi.generateHTML(await import('./routes/swagger.json'))
    );
  }
);

RegisterRoutes(app);

app.use(errorHandler);
app.use((request: Request, response: Response): void => {
  response.status(404).send({
    message: 'Not found',
  });
});

export { app };
