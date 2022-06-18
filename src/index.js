// @ts-check

import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const formatString = (data, key, sign = ' ') => `  ${sign} ${key}: ${data[key]}\n`;

const getReport = ({ keys, dataReference, dataCompare }) => {
  let report = '{\n';
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const isRemovedKey = !(key in dataCompare);
    const isAddedKey = !(key in dataReference);
    const isEqualFields = dataReference[key] === dataCompare[key];
    const isUpdate = !(isRemovedKey || isAddedKey || isEqualFields);

    if (isRemovedKey) {
      report += formatString(dataReference, key, '-');
    }
    if (isAddedKey) {
      report += formatString(dataCompare, key, '+');
    }
    if (isEqualFields) {
      report += formatString(dataReference, key);
    }
    if (isUpdate) {
      report += formatString(dataReference, key, '-');
      report += formatString(dataCompare, key, '+');
    }
  }
  return `${report}}`;
};

const loadData = (filepath) => {
  let data = '{}';
  try {
    data = readFileSync(path.resolve(filepath), 'utf8');
  } catch (error) {
    console.log(`Error reading file: ${error}`);
  }
  return JSON.parse(data);
};

const getKeys = (dataReference, dataCompare) => {
  const keys1 = Object.keys(dataReference);
  const keys2 = Object.keys(dataCompare);
  return {
    keys: _.union(keys1, keys2).sort(),
    dataReference,
    dataCompare,
  };
};

const genDiff = (filepath1, filepath2) => getReport(getKeys(loadData(filepath1), loadData(filepath2)));

export default genDiff;
