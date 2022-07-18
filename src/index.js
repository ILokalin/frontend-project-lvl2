// @ts-check
import path from 'path';
import { readFileSync } from 'fs';
import { parse } from './parsers.js';
import _ from 'lodash';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parse(readFileSync(filepath, 'utf8'), getFormat(filepath));

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

const getKeys = (dataReference, dataCompare) => {
  const keys1 = Object.keys(dataReference);
  const keys2 = Object.keys(dataCompare);
  return {
    keys: _.union(keys1, keys2).sort(),
    dataReference,
    dataCompare,
  };
};


const genDiff = (filepath1, filepath2) => {
  const data1 = getData(path.resolve(filepath1));
  const data2 = getData(path.resolve(filepath2));
  return getReport(getKeys(data1, data2));
};

export default genDiff;
