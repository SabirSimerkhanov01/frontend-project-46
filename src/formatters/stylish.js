const stylish = (data, replacer = ' ', spacesCount = 1) => {
  const str = (object, acc = 1) => {
    const allKeys = Object.keys(object);
    const getSize = (n) => replacer.repeat(n);
    const siOfObj = ((4 * spacesCount * acc) - 2);
    const siOfBrc = ((4 * spacesCount * acc) - 2 - spacesCount);

    const getValue = (value, accOfVal = 1) => {
      const sizeOfVal = siOfObj + ((4 * spacesCount * accOfVal));
      const sizeOfBrc = siOfBrc + ((4 * spacesCount * accOfVal) - spacesCount);
      if (typeof value !== 'object' || value === null) {
        return `${value}`;
      } if (typeof value === 'object') {
        const keys = Object.keys(value);
        const resOfVal = keys.map((key) => `${getSize(sizeOfVal)}  ${key}: ${getValue(value[key], accOfVal + 1)}`);
        return [
          '{',
          resOfVal.filter((el) => el !== null).join('\n'),
          `${getSize(sizeOfBrc)}}`,
        ].join('\n');
      }
      return '';
    };

    const result = allKeys.map((keys) => {
      const {
        key, value, value1, value2, type,
      } = object[keys];
      switch (type) {
        case 'object':
          return `${getSize(siOfObj)}  ${key}: ${str(value, acc + 1)}`;
        case 'added':
          return `${getSize(siOfObj)}+ ${key}: ${getValue(value, 1)}`;
        case 'deleted':
          return `${getSize(siOfObj)}- ${key}: ${getValue(value, 1)}`;
        case 'changed':
          return [
            `${getSize(siOfObj)}- ${key}: ${getValue(value1, 1)}`,
            `${getSize(siOfObj)}+ ${key}: ${getValue(value2, 1)}`,
          ].join('\n');
        case 'nochanged':
          return `${getSize(siOfObj)}  ${key}: ${getValue(value, 1)}`;
        default:
          throw new Error(`${type} is not correct`);
      }
    });
    return [
      '{',
      result.filter((el) => el !== null).join('\n'),
      `${getSize(siOfBrc - 1)}}`,
    ].join('\n');
  };

  return str(data, 1);
};

export default stylish;
