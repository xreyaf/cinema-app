export const textTruncate = (text, length, ending) => {
  if (length == null) {
    // eslint-disable-next-line no-param-reassign
    length = 100;
  }
  if (ending == null) {
    // eslint-disable-next-line no-param-reassign
    ending = '...';
  }
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  }
  return text;
};

export const match = (term, array, key) => {
  const reg = new RegExp(term.split('').join('.*'), 'i');
  return array.filter((item) => item[key] && item[key].match(reg));
};
