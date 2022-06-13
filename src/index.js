import { Command } from 'commander';

const app = () => {
  const program = new Command;
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .parse();
};

export default app;
