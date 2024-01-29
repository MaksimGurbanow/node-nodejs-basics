import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const copy = async (sourceDir, destinationDir) => {
    try {
        await fs.access(sourceDir);

        try {
            await fs.access(destinationDir);

            throw new Error('FS operation failed');
        } catch (destinationError) {
            if (destinationError.code === 'ENOENT') {
                await fs.mkdir(destinationDir, { recursive: true });
                const files = await fs.readdir(sourceDir);

                for (const file of files) {
                    const sourceFilePath = path.join(sourceDir, file);
                    const destinationFilePath = path.join(destinationDir, file);
        
                    const fileStats = await fs.stat(sourceFilePath);
        
                    if (fileStats.isDirectory()) {
                        await copy(sourceFilePath, destinationFilePath);
                    } else {
                        await fs.copyFile(sourceFilePath, destinationFilePath);
                    }
                }
            } else {
                console.error(destinationError.message);
            }
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(error.message);
        }
    }
};

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const sourceDirPath = path.join(__dirname, 'files');
const destinationDirPath = path.join(__dirname, 'files_copy');

await copy(sourceDirPath, destinationDirPath);
