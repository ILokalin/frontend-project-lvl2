// @ts-check

import path from 'node:path';
import process from 'node:process';
import { readFileSync } from 'fs';
import { Command } from 'commander';
import _ from 'lodash';
import { sign } from 'node:crypto';

export const formatString = (data, key, sign = ' ') => `  ${sign} ${key}: ${data[key]}\n`;

export const getReport = ({ keys, dataReference, dataCompare }) => {
  let report = '{\n';
  for (const key of keys) {
    const isRemovedKey = !(key in dataCompare);
    if (isRemovedKey) {
      report += formatString(dataReference, key, '-');
      continue;
    }

    const isAddedKey = !(key in dataReference);
    if (isAddedKey) {
      report += formatString(dataCompare, key, '+');
      continue;
    }

    const isEqualFields = dataReference[key] === dataCompare[key];
    if (isEqualFields) {
      report += formatString(dataReference, key);
      continue;
    }

    report += formatString(dataReference, key, '-');
    report += formatString(dataCompare, key, '+');
  }
  return report + '}';
};

export const loadData = (filepath) => {
  try {
    const data = readFileSync(path.resolve(filepath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error reading file: ${error}`);
  }
};

export const getKeys = (dataReference, dataCompare) => {
  const keys1 = Object.keys(dataReference);
  const keys2 = Object.keys(dataCompare);
  return {
    keys: _.union(keys1, keys2).sort(),
    dataReference,
    dataCompare,
  };
}
export const genDiff = (filepath1, filepath2) => getReport(getKeys(loadData(filepath1), loadData(filepath2)));

export const app = () => {
  const program = new Command();
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    })
    .parse(process.argv);
};

export default genDiff;
