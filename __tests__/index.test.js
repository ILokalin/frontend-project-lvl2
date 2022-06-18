// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getActualPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('main app test', () => {
  const filepath1 = getActualPath('file_1.json');
  const filepath2 = getActualPath('file_2.json');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  it('genDiff json', () => {
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
