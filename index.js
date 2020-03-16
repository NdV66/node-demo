const { readPortFromTxtFile } = require('./src/tools/TxtFileReader');
const { configureExpress } = require('./src/config/express');

const setupApp = port => configureExpress(__dirname, port);

readPortFromTxtFile('./data/port.txt', setupApp);
