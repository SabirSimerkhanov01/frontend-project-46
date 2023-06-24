import * as fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const readFiles = (type) => fs.readFileSync(path.resolve(process.cwd(), type), 'utf-8');

const reader = (file) => {
  const format = file.split('.')[1];
  const readedFile = readFiles(file);
  if (format === 'json') {
    return JSON.parse(readedFile);
  } if (format === 'yml' || format === 'yaml') {
    return yaml.parse(readedFile);
  }
};

export default reader;
