// @ts-check
import getStylishReport from './stylish.js';

const formatters = {
  stylish: getStylishReport,
};

export default (data, format) => formatters[format](data);
