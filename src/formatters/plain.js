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
    const allKeys = Object.keys(obj);
    const result = allKeys.map((keys) => {
      const {
        key, value, value1, value2, type,
      } = obj[keys];
      if (type === 'object') {
        return iter(value, `${acc + key}.`);
      } if (type === 'added') {
        return `Property '${acc + key}' was added with value: ${getValue(value)}`;
      } if (type === 'deleted') {
        return `Property '${acc + key}' was removed`;
      } if (type === 'changed') {
        return `Property '${acc + key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
      }
      return null;
    });
    return result.flat(1).filter((el) => el !== null).join('\n');
  };

  return iter(data);
};

export default plain;
