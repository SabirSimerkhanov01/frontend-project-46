import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);
const readFile = (type) => fs.readFileSync(getPath(type), 'utf-8');

test('test1', () => {
  const result1 = readFile('result1.txt');
  const gendiff = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(gendiff).toBe(result1);
});
