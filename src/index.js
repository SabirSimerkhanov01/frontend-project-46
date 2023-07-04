import _ from 'lodash';
import readFile from './reader.js';
import getFormat from './formatters/index.js';

const getDifferences = (data1, data2) => {
  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const unitedKeys = _.sortBy(_.union(key1, key2));
  return unitedKeys.flatMap((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return { key, value: getDifferences(data1[key], data2[key]), type: 'object' };
    } if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    } if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: data2[key], type: 'added' };
    } if (data1[key] !== data2[key]) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    } return {
      key, value: data2[key], type: 'nochanged',
    };
  });
};

const iter = (path1, path2, format = 'stylish') => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const result = getDifferences(data1, data2);
  return getFormat(result, format);
};

export default iter;
