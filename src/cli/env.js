const parseEnv = () => {
  for (const [prop, value] of Object.entries(process.env)) {
    if (prop.startsWith('RSS_', 0)) {
      process.stdout.write(prop + '=' + value + ';');
    }
  }
};

parseEnv();