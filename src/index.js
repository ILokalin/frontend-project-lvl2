// @ts-check
import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildDiffTree from './treeBuilder.js';
import formatters from './formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parse(readFileSync(filepath, 'utf8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(path.resolve(filepath1));
  const data2 = getData(path.resolve(filepath2));
  const internalTree = buildDiffTree(data1, data2);

  return formatters(internalTree, outputFormat);
};

export default genDiff;
