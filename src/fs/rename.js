import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async (oldName, newName) => {
  try {
    await fs.access(oldName);

		try {
			await fs.access(newName);

			throw new Error('FS operation failed');
		} catch (error) {
			if (error.code === 'ENOENT') {
				await fs.rename(oldName, newName);
			}
			else {
				console.log(error.message)
			}
		}
  } catch (error) {
		console.error('FS operation failed')
	}
};

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
const newPath = path.join(__dirname, 'files', 'properFilename.md');
await rename(oldPath, newPath);
