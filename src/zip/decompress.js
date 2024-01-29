import { createReadStream, createWriteStream, unlink } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createUnzip } from "zlib";

const decompress = async (src, dest) => {
  const readableStream = createReadStream(src);
  const unZip = createUnzip();
  const writableStream = createWriteStream(dest);

  readableStream.pipe(unZip).pipe(writableStream);

  writableStream.on("finish", () => {
    unlink(src, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "files", "archive.gz");
const dest = path.join(__dirname, "files", "fileToCompress.txt");
await decompress(src, dest);
