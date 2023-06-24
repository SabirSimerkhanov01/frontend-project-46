import lodash from 'lodash';
import reader from './reader.js';

const genDiff = (file1, file2) => {
  const data1 = reader(file1);
  const data2 = reader(file2);
  return data1;
};

export default genDiff;
