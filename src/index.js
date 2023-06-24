import _ from 'lodash';
import reader from './reader.js';

const iter = (data1, data2) => {
  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const keys = _.merge(key1, key2);
  const sortedKeys = _.sortBy(keys);
  sortedKeys.forEach((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      iter(data1[key], data2[key2]);
    } else {
      console.log(key, data1[key]);
    }
  });
};

const genDiff = (file1, file2) => {
  const data1 = reader(file1);
  const data2 = reader(file2);
  return iter(data1, data2);
};

export default genDiff;
