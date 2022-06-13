import path from 'node:path';
import process from 'node:process';
import { readFileSync } from 'fs';
import { Command } from 'commander';
import _ from 'lodash';

export const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  return {
    keys: _.union(keys1, keys2).sort(),
    data1,
    data2,
  }
};

export const getReport = ({ keys, data1, data2 }, options) => {
  let report = '{\n';
  for (const key of keys) {
    if (!data2.hasOwnProperty(key)) {
      report += `  - ${key}: ${data1[key]}\n`;
      continue;
    }
    if (!data1.hasOwnProperty(key)) {
      report += `  + ${key}: ${data2[key]}\n`;
      continue;
    }
    if (data1[key] === data2[key]) {
      report += `    ${key}: ${data1[key]}\n`;
      continue;
    }
    report += `  - ${key}: ${data1[key]}\n`;
    report += `  + ${key}: ${data2[key]}\n`;
  }
  return report + '\n}';
};

export const loadData = (filepath) => {
  try {
    const data = readFileSync(path.resolve(filepath), 'utf8');
    return JSON.parse(data);
  } catch(error) {
    console.log(`Error reading file: ${error}`);
  }
}

export const genDiff = (filepath1, filepath2, options) => {
  return getReport(getDiff(loadData(filepath1), loadData(filepath2)), options);
}

export const app = () => {
  const program = new Command;
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, options) => {
      console.log(genDiff(filepath1, filepath2, options));
    })
    .parse(process.argv);
};

export default genDiff;
