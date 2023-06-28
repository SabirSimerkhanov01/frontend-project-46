import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      console.log('nothing');
  }
};

export default getFormat;
