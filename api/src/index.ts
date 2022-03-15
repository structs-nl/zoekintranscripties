import { app } from './app';
import { logger } from './helpers';

const port = process.env.PORT || 8080;

process.on('unhandledRejection', (error) => {
  logger.error(error);
});

app.listen(port, () => {
  logger.info(`Api listening to port ${port}`);
});
