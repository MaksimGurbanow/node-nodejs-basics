import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const childProcessPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'script.js')

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [childProcessPath, ...args], {
		stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
	});

	process.stdin.pipe(childProcess.stdin);

	childProcess.stdout.pipe(process.stdout);

	childProcess.on('exit', (code) => {
		console.log(`Child process exited with code ${code}`);
		process.exit(code);
});
};

spawnChildProcess(process.argv.slice(2).length ? process.argv.slice(2) : ['arg1', 'arg2']);
