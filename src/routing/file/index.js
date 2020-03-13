const express = require('express');
const fs = require('fs');
const router = express.Router();
const { readDataFromFile } = require('../../tools/TxtFileReader');

const sendFileAsyncAsPlainText = (res, file, basePath) => {
    const path = `${basePath}/${file}`;
    const callback = data => res.send(data).toString();
    const onError = () => res.status(500).send('Error');
    readDataFromFile(path, callback, onError);
};

const getFilesizeInBytes = path => {
    const stats = fs.statSync(path);
    const fileSizeInBytes = stats['size'];
    return fileSizeInBytes;
};

const getFilenames = (path, callback) => {
    fs.readdir(path, (err, files) => {
        const namedFiles = files.map(file => ({ name: file }));
        callback(namedFiles);
    });
};

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
        const size = getFilesizeInBytes(path);

        res.json({ size });
    });

    router.get('/filenames', (req, res) => {
        const callback = data => res.json(data);
        getFilenames(basePath, callback);
    });

    return router;
};
