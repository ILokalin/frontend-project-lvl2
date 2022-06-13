import { Command } from 'commander';

const app = () => {
  const program = new Command;
  program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .parse();

};

export default app;
