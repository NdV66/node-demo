const express = require('express');
const app = express();
const testRouter = require('./src/routing/test');
const bodyParser = require('body-parser');

const BASE_PATH = __dirname + '/data';
const FILE_API_BASE_PATH = BASE_PATH + '/files';
const STRINGS_PATH = BASE_PATH + '/scripts';
const LINKED_BASE_PATH = BASE_PATH + '/linked';

const fileRouter = require('./src/routing/file')(FILE_API_BASE_PATH);
const jsonRouter = require('./src/routing/json')(FILE_API_BASE_PATH);
const stringsRouter = require('./src/routing/strings')(STRINGS_PATH);
const dataRouter = require('./src/routing/data');
const linkedRouter = require('./src/routing/linked')(LINKED_BASE_PATH);

const { readPortFromTxtFile } = require('./src/tools/TxtFileReader');

const setupApp = port => {
    app.use(bodyParser.json());

    app.use('/', testRouter);
    app.use('/', fileRouter);
    app.use('/', jsonRouter);
    app.use('/', stringsRouter);
    app.use('/data', dataRouter);
    app.use('/linked', linkedRouter);

    app.listen(port, () => console.log(`Node demo is listing on port: ${port}!`));
};

readPortFromTxtFile('./data/port.txt', setupApp);
