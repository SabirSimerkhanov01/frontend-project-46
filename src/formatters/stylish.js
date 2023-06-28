const stylish = (object, replacer = ' ', countOfReplacer = 1) => {
  const iter = (data, acc = 1) => {
    const arr = [];
    const keys = Object.keys(data);
    const numForSize = countOfReplacer * acc;
    const innerSize = replacer.repeat(numForSize);
    const sizeForBrack = replacer.repeat(numForSize);

    const checkData = (datas) => {
      const arrOfStr = [];
      if (typeof datas !== 'object' || datas === null) {
        return datas;
      } if (typeof datas === 'object') {
        const keysOfCheck = Object.keys(datas);
        keysOfCheck.forEach((key) => {
          if (typeof datas[key] !== 'object') {
            arrOfStr.push(`${key}: ${datas[key]}`);
          } if (typeof datas[key] === 'object') {
            arrOfStr.push(`${key}: ${checkData(datas[key])}`);
          }
        });
      }
      return [
        '{',
        ...arrOfStr,
        `${sizeForBrack}}`,
      ].join('\n');
    };

    keys.forEach((key) => {
      if (data[key].type === 'object') {
        arr.push(`${innerSize}  ${data[key].key}: ${iter(data[key].value, acc + 1)}`);
      } if (data[key].type === 'added') {
        arr.push(`${innerSize}+ ${data[key].key}: ${checkData(data[key].value)}`);
      } if (data[key].type === 'deleted') {
        arr.push(`${innerSize}- ${data[key].key}: ${checkData(data[key].value)}`);
      } if (data[key].type === 'changed') {
        arr.push(`${innerSize}- ${data[key].key}: ${checkData(data[key].value1)}`);
        arr.push(`${innerSize}+ ${data[key].key}: ${checkData(data[key].value2)}`);
      } if (data[key].type === 'nochanged') {
        arr.push(`${innerSize}  ${data[key].key}: ${checkData(data[key].value2)}`);
      }
    });
    return [
      '{',
      ...arr,
      '}',
    ].join('\n');
  };
  return iter(object, 1);
};

export default stylish;
