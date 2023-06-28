const plain = (data) => {
  const arr = [];
  let arkey = [];
  const keys = Object.keys(data);

  const checkObj = (datas) => {
    if (typeof datas !== 'object' || datas === null) {
      return datas;
    } if (typeof datas === 'object') {
      return '[complex value]';
    }
  };

  keys.forEach((key) => {
    arkey = [];
    arkey.push(data[key].key);
    if (data[key].type === 'object') {
      arr.push(`Property '${arkey}' was added with value: '${plain(data[key].value)}'`);
    } if (data[key].type === 'added') {
      arr.push(`Property '${arkey}' was added with value: '${checkObj(data[key].value)}'`);
    } if (data[key].type === 'deleted') {
      arr.push(`Property '${arkey}' was removed`);
    } if (data[key].type === 'changed') {
      arr.push(`Property '${arkey}' was updated. From '${checkObj(data[key].value1)}' to '${checkObj(data[key].value2)}'`);
    }
  });
  return arr.join('\n');
};

export default plain;
