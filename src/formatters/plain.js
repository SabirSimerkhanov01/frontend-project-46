const plain = (data) => {
  const arr = [];
  const keys = Object.keys(data);

  const getValue = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    } if (value === null) {
      return value;
    } if (typeof value === 'object') {
      return '[complex value]';
    }
    return value;
  };

  let arrOfKey = [];
  const iter = (data) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key].type === 'object') {
        arrOfKey.push(data[key].key);
        iter(data[key].value);
      } if (data[key].type === 'deleted') {
        arr.push(`Property '${arrOfKey.join('.')}.${data[key].key}' was removed`);
      } if (data[key].type === 'added') {
        arr.push(`Property '${arrOfKey.join('.')}.${data[key].key}' was added with value: ${getValue(data[key].value)}`);
      } if (data[key].type === 'changed') {
        arr.push(`Property '${arrOfKey.join('.')}.${data[key].key}' was updated. From ${getValue(data[key].value1)} to ${getValue(data[key].value2)}`);
      }
    });
  };

  keys.forEach((key) => {
    arrOfKey = [];
    if (data[key].type === 'object') {
      arrOfKey.push(data[key].key);
      iter(data[key].value);
    }
    if (data[key].type === 'deleted') {
      arr.push(`Property '${data[key].key}' was removed`);
    } if (data[key].type === 'added') {
      arr.push(`Property '${data[key].key}' was added with value: ${getValue(data[key].value)}`);
    } if (data[key].type === 'changed') {
      arr.push(`Property '${data[key].key}' was updated. From ${getValue(data[key].value1)} to ${getValue(data[key].value2)}`);
    }
  });
  return arr.join('\n');
};

export default plain;
