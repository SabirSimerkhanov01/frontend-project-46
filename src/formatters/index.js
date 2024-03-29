import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      return stylish(data);
  }
};

export default getFormat;
