// @ts-check
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getActualPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getActualPath(filename), 'utf-8').trim();

const diffJson = readFixture('diff_json.txt');
const diffYml = readFixture('diff_yml.txt');

describe('app test', () => {
  it('genDiff json', () => {
    const filepath1 = getActualPath('file_1.json');
    const filepath2 = getActualPath('file_2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diffJson);
  });

  it('genDiff yml', () => {
    const filepath1 = getActualPath('file_1.yml');
    const filepath2 = getActualPath('file_2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(diffYml);
  });
});
