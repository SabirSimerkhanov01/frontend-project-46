const stylish = (data, replacer = ' ', spacesCount = 1) => {
  const str = (o, acc = 1) => {
    const arr = [];
    const getRepeat = (n) => replacer.repeat(n);
    const sizKey = ((4 * spacesCount * acc) - 2);
    const sizBrc = ((4 * spacesCount * acc) - 2 - spacesCount);
    const checkValue = (value) => {
      let add = 1;
      const sizKey2 = sizBrc + (4 * add);
      const sizBrc2 = sizBrc + (4 * add) - spacesCount;
      const arr = [];
      if (typeof value !== 'object') {
        return String(value);
      } if (value === null) {
        return null;
      }
      if (typeof value === 'object') {
        const entries = Object.entries(value);
        entries.forEach(([key, value]) => {
          add += 1;
          arr.push(`${getRepeat(sizKey2)}  ${key}: ${checkValue(value)}`);
        });
      }
      return [
        '{',
        ...arr,
        `${getRepeat(sizBrc2)}}`,
      ].join('\n');
    };

    const keys = Object.keys(o);
    keys.forEach((keys) => {
      const {
        key, type, value, value1, value2,
      } = o[keys];
      if (type === 'object') {
        arr.push(`${getRepeat(sizKey)}  ${key}: ${str(value, acc + 1)}`);
      } if (type === 'added') {
        arr.push(`${getRepeat(sizKey)}+ ${key}: ${checkValue(value)}`);
      } if (type === 'deleted') {
        arr.push(`${getRepeat(sizKey)}- ${key}: ${checkValue(value)}`);
      } if (type === 'changed') {
        arr.push(`${getRepeat(sizKey)}- ${key}: ${checkValue(value1)}`);
        arr.push(`${getRepeat(sizKey)}+ ${key}: ${checkValue(value2)}`);
      } if (type === 'nochanged') {
        arr.push(`${getRepeat(sizKey)}  ${key}: ${checkValue(value2)}`);
      }
    });

    return [
      '{',
      ...arr,
      `${getRepeat(sizBrc)}}`,
    ].join('\n');
  };

  return str(data, 1);
};

export default stylish;
