const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getFilenames } = require('../helper');
const { processValueFromFile, removeTxtExtension } = require('./helper');

const readLinkedNameAndValues = (filenames, path, basePath) =>
    filenames.map(({ name }, index) => {
        const fileContent = processValueFromFile(fs.readFileSync(`${basePath}/${name}`));

        return {
            name: removeTxtExtension(name),
            id: fileContent,
            value: processValueFromFile(fs.readFileSync(`${path}/values/${fileContent}.txt`)),
        };
    });

const onCallback_GET = (path, callback) => {
    const basePath = `${path}/names`;
    const getFilenamesCallback = filenames => {
        const data = readLinkedNameAndValues(filenames, path, basePath);
        callback(data);
    };

    getFilenames(basePath, getFilenamesCallback);
};

module.exports = path => {
    router.get('/', (req, res) => {
        const callback = data => res.json(data);
        onCallback_GET(path, callback);
    });

    return router;
};
