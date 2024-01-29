import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const workerPath = path.join(__dirname, 'worker.js', );
	const numCpu = os.cpus().length;
  const workerPromises = [];

  for (let i = 0; i < numCpu; i++) {
    const worker = new Worker(workerPath, { workerData: 10 + i });

    const workerPromise = new Promise((resolve) => {
      worker.on('message', (value) => {
        resolve(value);
      });

      worker.on('error', (error) => {
        console.error('Error happened in worker: ' + error);
        resolve({ status: 'error', data: null });
      });
    });

    workerPromises.push(workerPromise);
  }

	const results = await Promise.all(workerPromises);

  console.log('Results:', results);
};

await performCalculations();