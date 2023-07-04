import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);
const readFile = (type) => fs.readFileSync(getPath(type), 'utf-8');

const nameFiles = [
  ['__fixtures__/fileDeep1.json', '__fixtures__/fileDeep2.json', 'stylish', 'result_deep_json.txt'],
  ['__fixtures__/fileDeep1.yaml', '__fixtures__/fileDeep2.yaml', 'plain', 'result_deep_plain.txt'],
  ['__fixtures__/fileDeep1.yml', '__fixtures__/fileDeep2.yml', 'json', 'result_deep_json2.txt'],
];

test.each(nameFiles)('work function with formats', (file1, file2, format, result) => {
  const result1 = readFile(result);
  expect(genDiff(file1, file2, format)).toEqual(result1);
});
