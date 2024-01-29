import { createReadStream, createWriteStream, unlink } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const compress = async (src, dest) => {
  const readableStream = createReadStream(src);
  const gZip = createGzip();
  const writableStream = createWriteStream(dest);

  readableStream.pipe(gZip).pipe(writableStream);

  writableStream.on("finish", () => {
    unlink(src, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "files", "fileToCompress.txt");
const dest = path.join(__dirname, "files", "archive.gz");
await compress(src, dest);
