const parseArgs = () => {
	let answer = [];
	for (let i = 2; i < process.argv.length; i += 2) {
		answer.push(
			process.argv[i].slice(2)
		 + " is "
		 + process.argv[i + 1]
		);
	}
	process.stdout.write(answer.join(", "))
};

parseArgs();