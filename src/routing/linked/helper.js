const processValueFromFile = buffer => buffer.toString().replace('\r\n', '');

const removeTxtExtension = name => name.replace('.txt', '');

module.exports = { processValueFromFile, removeTxtExtension };
