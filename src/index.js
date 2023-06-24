import _ from 'lodash';
import reader from './reader.js';

const iter = (data1, data2) => {
  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const keys = _.sortBy(key1, key2);
  keys.forEach((key) => {
    if (typeof data1[key] === 'object') {
      console.log(key, data1[key]);
      iter(data1[key]);
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
