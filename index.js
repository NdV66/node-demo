const express = require('express');
const app = express();
const testRouter = require('./src/routing/test');

const { readDataFromTxtFile } = require('./src/tools/TxtFileReader');

const setupApp = port => {
    app.use('/', testRouter);

    app.listen(port, () => console.log(`Node demo is listing on port: ${port}!`));
};

readDataFromTxtFile('./data/port.txt', setupApp);
