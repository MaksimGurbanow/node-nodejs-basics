import { workerData, parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (value) => {
    try {
        parentPort.postMessage({status: 'resolved', data: nthFibonacci(value)});
    } catch (error) {
        parentPort.postMessage({status: 'error', data: null})
    }
};

sendResult(workerData);