import fs from 'fs/promises';
import path from 'path';

const read = async (filePath) => {
	try {
		await fs.access(filePath);
		const content = await fs.readFile(filePath, 'utf8');
		console.log(content);
	} catch (error) {
		if (error.code === 'ENOENT') {
			process.stderr._write('FS operation failed');
		}
	}
};

const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
await read(filePath);