// @ts-check
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const diffJson = readFile('diff_json.txt');
const diffYml = readFile('diff_yml.txt');

describe('app test', () => {
  it('genDiff json', () => {
    const filepath1 = getFixturePath('file_1.json');
    const filepath2 = getFixturePath('file_2.json');

    expect(genDiff(filepath1, filepath2)).toBe(diffJson);
  });

  it('genDiff yml', () => {
    const filepath1 = getFixturePath('file_1.yml');
    const filepath2 = getFixturePath('file_2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(diffYml);
  });
});
