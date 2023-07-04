const plain = (data) => {
  const getValue = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    } if (typeof value !== 'object' || value === null) {
      return `${value}`;
    }
    return '[complex value]';
  };

  const iter = (obj, acc = '') => {
    const keys = Object.keys(obj);
    return keys.forEach((keyFromObj) => {
      const {
        key, value, value1, value2, type,
      } = obj[keyFromObj];

      switch (type) {
        case 'object':
          return iter(value, `${acc + key}.`);
        case 'deleted':
          return `Property '${acc + key}' was removed`;
        case 'added':
          return `Property '${acc + key}' was added with value: ${getValue(value)}`;
        case 'changed':
          return `Property '${acc + key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        default:
          return new Error('error');
      }
    });
  };

  return iter(data);
};

export default plain;
