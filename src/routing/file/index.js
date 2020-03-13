const express = require('express');
const fs = require('fs');
const router = express.Router();
const { readDataFromTxtFile } = require('../../tools/TxtFileReader');

module.exports = basePath => {
    const FILE_A_RESPONSE = fs.readFileSync(`${basePath}/file-a.txt`).toString();

    router.get('/file-a', (req, res) => res.send(FILE_A_RESPONSE));

    router.get('/file-b', (req, res) => {
        const path = `${basePath}/file-b.txt`;
        const callback = data => res.send(data).toString();
        readDataFromTxtFile(path, callback);
    });

    return router;
};
