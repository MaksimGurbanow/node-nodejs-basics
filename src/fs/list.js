import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async (dirPath) => {
  try {
		await fs.access(dirPath);
		const files = await fs.readdir(dirPath);
		console.log(files.join(', '));
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.error('FS operation failed')
		}
	}
};

const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName);
const dirPath = path.join(__dirname, 'files');
await list(dirPath);