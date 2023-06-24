import _ from 'lodash';
import reader from './reader.js';

const iter = (file1, file2) => {
  const keys = _.keys(file1);
  keys.forEach((key) => {
    if (typeof file1[key] === 'object') {
      console.log(key, file1[key]);
      iter(file1[key]);
    } else {
      console.log(key, file1[key]);
    }
  });
};

const genDiff = (file1, file2) => {
  const data1 = reader(file1);
  const data2 = reader(file2);
  return iter(data1, data2);
};

export default genDiff;
