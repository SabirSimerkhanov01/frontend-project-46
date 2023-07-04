import * as fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const readFiles = (type) => fs.readFileSync(path.resolve(process.cwd(), type), 'utf-8');

const reader = (file) => {
  const format = file.split('.')[1];
  const readedFile = readFiles(file);
  switch (format) {
    case 'json':
      return JSON.parse(readedFile);
    case 'yml':
    case 'yaml':
      return yaml.load(readedFile);
    default:
      throw new Error(`${format} is not correct format. Please check format`);
  }
};

export default reader;
