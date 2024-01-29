import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async (readFrom) => {
    try {
        await fs.promises.access(readFrom);
        const readableStream = fs.createReadStream(readFrom, { encoding: 'utf-8' });

        readableStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

    } catch (error) {
        console.error(error);
    }
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readFrom = path.join(__dirname, 'files', 'fileToRead.txt');
await read(readFrom);
