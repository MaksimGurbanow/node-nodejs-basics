import path from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async (src) => {
	const readableStream = fs.createReadStream(src);
	const hash = crypto.createHash('sha256');

	readableStream.on('data', (data) => {
		hash.update(data)
	})

	readableStream.on('end', () => {
		stdout.write('Hash => ' + hash.digest('hex'));
	})

	readableStream.on('error', (err) => console.error(err));
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
await calculateHash(src);