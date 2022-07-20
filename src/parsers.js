// @ts-check
import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);

    case 'json':
      return JSON.parse(data);

    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
