import fs from 'fs/promises';
import path from 'path';

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

const filePath = path.join('src', 'fs', 'files', 'fileToRemove.txt');
await remove(filePath);