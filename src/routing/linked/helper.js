const processValueFromFile = buffer => buffer.toString().replace('\r\n', '');

const removeTxtExtension = name => name.replace('.txt', '');

const convertBuffersToString = buffers => buffers.map(processValueFromFile);

module.exports = { processValueFromFile, removeTxtExtension, convertBuffersToString };
