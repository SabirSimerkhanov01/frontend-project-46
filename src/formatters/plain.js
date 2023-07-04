const plain = (data) => {
  const getValue = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    } if (typeof value !== 'object' || value === null) {
      return `${value}`;
    } if (typeof value === 'object') {
      return '[complex value]';
    }
  };

  const arr = [];

  const iter = (obj, acc = '') => {
    const keys = Object.keys(obj);
    keys.forEach((keyFromObj) => {
      const {
        key, value, value1, value2, type,
      } = obj[keyFromObj];

      if (type === 'object') {
        iter(value, `${acc + key}.`);
      } if (type === 'deleted') {
        arr.push(`Property '${acc + key}' was removed`);
      } if (type === 'added') {
        arr.push(`Property '${acc + key}' was added with value: ${getValue(value)}`);
      } if (type === 'changed') {
        arr.push(`Property '${acc + key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`);
      }
    });
    return arr.join('\n');
  };

  return iter(data);
};

export default plain;
