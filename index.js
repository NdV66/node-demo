const express = require('express');
const app = express();
const testRouter = require('./src/routing/test');

const FILE_API_BASE_PATH = __dirname + '/data/files';
const fileRouter = require('./src/routing/file')(FILE_API_BASE_PATH);
const jsonRouter = require('./src/routing/json')(FILE_API_BASE_PATH);

const { readPortFromTxtFile } = require('./src/tools/TxtFileReader');

const setupApp = port => {
    app.use('/', testRouter);
    app.use('/', fileRouter);
    app.use('/', jsonRouter);

    app.listen(port, () => console.log(`Node demo is listing on port: ${port}!`));
};

readPortFromTxtFile('./data/port.txt', setupApp);
