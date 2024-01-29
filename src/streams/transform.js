import { stdout, stdin } from "process";
import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, __, callback) {
      this.push(
        `${chunk.toString().trim().split("").reverse().join("")}\n`
      );
      callback();
    },
  });

	stdout.write("Please enter the text: ");
	stdin.pipe(reverseTransform).pipe(stdout);

	process.on('SIGINT', () => {
    stdout.write(`\nThe program finished! Bye!`);
    stdin.end();
    process.exit(0);
  });
};

await transform();
