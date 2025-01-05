import cluster from 'cluster';
import os from 'os';
import { app } from './app';

const port = Number(process.env.INGEST_PORT) || 6000;
const cpuCount = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
}

if (cluster.isWorker) {
  app.listen(port, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${port}`);
  });
}
