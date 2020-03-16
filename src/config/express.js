const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const DB = new Map();

const configureExpress = (path, port) => {
    const BASE_PATH = path + '/data';
    const FILE_API_BASE_PATH = BASE_PATH + '/files';
    const STRINGS_PATH = BASE_PATH + '/scripts';
    const LINKED_BASE_PATH = BASE_PATH + '/linked';

    const testRouter = require('../routing/test');
    const fileRouter = require('../routing/file')(FILE_API_BASE_PATH);
    const jsonRouter = require('../routing/json')(FILE_API_BASE_PATH);
    const stringsRouter = require('../routing/strings')(STRINGS_PATH);
    const dataRouter = require('../routing/data')(DB);
    const linkedRouter = require('../routing/linked')(LINKED_BASE_PATH);

    app.use(bodyParser.json());

    app.use('/', testRouter);
    app.use('/', fileRouter);
    app.use('/', jsonRouter);
    app.use('/', stringsRouter);
    app.use('/data', dataRouter);
    app.use('/linked', linkedRouter);

    app.listen(port, () => console.log(`Node demo is listing on port: ${port}!`));
};

module.exports = { configureExpress };
