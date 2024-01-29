import fs from "fs";
import { stdin, stdout, exit } from 'process';
import path from 'path';
import { fileURLToPath } from "url";

const write = async (dest) => {
  try {
    await fs.promises.access(dest);
		const input = fs.createWriteStream(dest);
    stdout.write("Please enter the text: ");
    stdin.on("data", (data) => {
      if (data.toString().trim() === "exit") {
        exit();
      } else {
        input.write(data, (err) => {
          try {
            stdout.write("The text was added: " + data);
          } catch {
            throw err;
          }
        });
      }
    });
    process.on("exit", () => {
      stdout.write("The program finished! Bye!");
    });

    process.on("SIGINT", () => {
      exit();
    });
  } catch (error) {
		console.error(error)
	}
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const writeTo = path.join(__dirname, "files", "fileToWrite.txt");
await write(writeTo);
