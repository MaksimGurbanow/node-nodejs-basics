import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async (filePath) => {
	try {
		await fs.access(filePath);

		await fs.rm(filePath);
} catch (error) {
		if (error.code === 'ENOENT') {
			console.error('FS operation failed');
		}
}
};

const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName);
const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
await remove(filePath);