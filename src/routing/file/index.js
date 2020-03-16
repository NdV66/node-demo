const express = require('express');
const fs = require('fs');
const router = express.Router();

const { sendFileAsyncAsPlainText, getFilenames, getFilenamesWithSizes, getFileSizeInBytes } = require('../helper');

module.exports = basePath => {
    const FILE_A_RESPONSE = fs.readFileSync(`${basePath}/file-a.txt`).toString();

    router.get('/file-a', (req, res) => res.send(FILE_A_RESPONSE));

    router.get('/file-b', (req, res) => sendFileAsyncAsPlainText(res, 'file-b.txt', basePath));

    router.get('/file', (req, res) => {
        const fileName = req.query.name;
        sendFileAsyncAsPlainText(res, `${fileName}.txt`, basePath);
    });

    router.get('/size', (req, res) => {
        const fileName = req.query.name;
        const path = `${basePath}/${fileName}`;
        const size = getFileSizeInBytes(path);

        res.json({ size });
    });

    router.get('/filenames', (req, res) => {
        const callback = data => res.json(data);
        getFilenames(basePath, callback);
    });

    router.get('/sizes', (req, res) => {
        const callback = data => res.json(data);
        getFilenamesWithSizes(basePath, callback);
    });

    router.get('/txt', (req, res) => {
        const filter = fileName => /.*\.txt/.test(fileName);
        const callback = filenames => {
            const data = filenames
                .map(el => el.name)
                .map(name => fs.readFileSync(`${basePath}/${name}`).toString())
                .join('');

            res.json(data);
        };
        getFilenames(basePath, callback, filter);
    });

    return router;
};
