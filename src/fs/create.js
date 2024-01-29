import path from 'path';
import fs from 'fs/promises';

const create = async (filePath) => {
    try {
        await fs.access(filePath);

        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, 'I am fresh and young');
            console.log('File created successfully');
        } else {
            console.error(error.message);
        }
    }
};

const filePath = path.join('src', 'fs', 'files', 'fresh.txt');
await create(filePath);
