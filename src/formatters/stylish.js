// @ts-check
import _ from 'lodash';

const INDENT = 4;
const INDENT_OFFSET = 2;

const getIndent = (depth) => ' '.repeat(depth * INDENT - INDENT_OFFSET);

const stringify = (data, depth, render) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object
    .entries(data)
    .map(([key, value]) => render({ key, value, type: 'unchanged' }, depth + 1));
  return `{\n${output.join('\n')}\n${getIndent(depth)}  }`;
};

const render = (node, depth) => {
  const { key, type } = node;
  const indent = depth && getIndent(depth);

  switch (type) {
    case 'root': {
      const { children } = node;
      // eslint-disable-next-line no-shadow
      const output = children.map((node) => render(node, depth + 1));
      return `{\n${output.join('\n')}\n}`;
    }
    case 'nested': {
      const { children } = node;
      // eslint-disable-next-line no-shadow
      const output = children.flatMap((node) => render(node, depth + 1));
      return `${indent}  ${key}: {\n${output.join('\n')}\n${indent}  }`;
    }
    case 'changed': {
      const data1 = `${indent}- ${key}: ${stringify(node.value1, depth, render)}`;
      const data2 = `${indent}+ ${key}: ${stringify(node.value2, depth, render)}`;
      return [data1, data2];
    }
    case 'removed':
      return `${indent}- ${key}: ${stringify(node.value, depth, render)}`;
    case 'added':
      return `${indent}+ ${key}: ${stringify(node.value, depth, render)}`;
    case 'unchanged':
      return `${indent}  ${key}: ${stringify(node.value, depth, render)}`;
    default:
      throw new Error(`unknown type ${type}`);
  }
};

export default (tree) => render(tree, 0);
