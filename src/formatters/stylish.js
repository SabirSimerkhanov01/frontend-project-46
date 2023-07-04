const stylish = (object, replacer = ' ', countOfReplacer = 1) => {
  const getSize = (n) => replacer.repeat((n * 4 * countOfReplacer) - 2);
  const size = 1;

  const iter = (data) => {
    const arr = [];
    const keys = Object.keys(data);

    const checkData = (datas) => {
      const arrOfStr = [];
      if (typeof datas !== 'object' || datas === null) {
        return datas;
      } if (typeof datas === 'object') {
        const keysOfCheck = Object.keys(datas);
        keysOfCheck.forEach((key) => {
          if (typeof datas[key] !== 'object') {
            arrOfStr.push(`${getSize(size)}  ${key}: ${datas[key]}`);
          } if (typeof datas[key] === 'object') {
            arrOfStr.push(`${getSize(size)}  ${key}: ${checkData(datas[key])}`);
          }
        });
      }
      return [
        '{',
        ...arrOfStr,
        '}',
      ].join('\n');
    };

    keys.forEach((key) => {
      if (data[key].type === 'object') {
        arr.push(`${getSize(size)}  ${data[key].key}: ${iter(data[key].value)}`);
      } if (data[key].type === 'added') {
        arr.push(`${getSize(size)}+ ${data[key].key}: ${checkData(data[key].value)}`);
      } if (data[key].type === 'deleted') {
        arr.push(`${getSize(size)}- ${data[key].key}: ${checkData(data[key].value)}`);
      } if (data[key].type === 'changed') {
        arr.push(`${getSize(size)}- ${data[key].key}: ${checkData(data[key].value1)}`);
        arr.push(`${getSize(size)}+ ${data[key].key}: ${checkData(data[key].value2)}`);
      } if (data[key].type === 'nochanged') {
        arr.push(`${getSize(size)}  ${data[key].key}: ${checkData(data[key].value2)}`);
      }
    });
    return [
      '{',
      ...arr,
      '}',
    ].join('\n');
  };

  // return iter(object, 1);
  return JSON.stringify(object, null, 2);
};

export default stylish;
