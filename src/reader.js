import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (file) => path.join(__dirname, '..', '__fixtures__', file);
const readFiles = (type) => fs.readFileSync(getPath(type), 'utf-8');

const reader = (file1) => readFiles(file1);

export default reader;
