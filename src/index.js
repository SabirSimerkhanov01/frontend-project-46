import reader from './reader.js';

const genDiff = (file1, file2) => {
  const data1 = JSON.parse(reader(file1));
  const data2 = JSON.parse(reader(file2));
  for (const el in data1) {
    console.log(data1[el]);
  }
};

export default genDiff;
