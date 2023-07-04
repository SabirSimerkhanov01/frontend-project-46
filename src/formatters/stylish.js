const stylish = (data, replacer = ' ', spacesCount = 1) => {
  const str = (o, acc = 1) => {
    const arr = [];
    const getRepeat = (n) => replacer.repeat(n);
    const sizKey = ((4 * spacesCount * acc) - 2);
    const sizBrc = ((4 * spacesCount * acc) - 2 - spacesCount);

    const checkValue = (value, add) => {
      const sizKey2 = sizBrc + (4 * add) + 1;
      const sizBrc2 = sizBrc + (4 * add) - spacesCount;
      const arr2 = [];
      if (typeof value !== 'object') {
        return String(value);
      } if (value === null) {
        return null;
      }
      if (typeof value === 'object') {
        const entries = Object.entries(value);
        entries.forEach(([key, values]) => {
          arr2.push(`${getRepeat(sizKey2)}  ${key}: ${checkValue(values, add + 1)}`);
        });
      }
      return [
        '{',
        ...arr2,
        `${getRepeat(sizBrc2)}}`,
      ].join('\n');
    };

    const allKeys = Object.keys(o);
    allKeys.forEach((keys) => {
      const {
        key, type, value, value1, value2,
      } = o[keys];
      if (type === 'object') {
        arr.push(`${getRepeat(sizKey)}  ${key}: ${str(value, acc + 1)}`);
      } if (type === 'added') {
        arr.push(`${getRepeat(sizKey)}+ ${key}: ${checkValue(value, 1)}`);
      } if (type === 'deleted') {
        arr.push(`${getRepeat(sizKey)}- ${key}: ${checkValue(value, 1)}`);
      } if (type === 'changed') {
        arr.push(`${getRepeat(sizKey)}- ${key}: ${checkValue(value1, 1)}`);
        arr.push(`${getRepeat(sizKey)}+ ${key}: ${checkValue(value2, 1)}`);
      } if (type === 'nochanged') {
        arr.push(`${getRepeat(sizKey)}  ${key}: ${checkValue(value, 1)}`);
      }
    });

    return [
      '{',
      ...arr,
      `${getRepeat(sizBrc - 1)}}`,
    ].join('\n');
  };

  return str(data, 1);
};

export default stylish;
