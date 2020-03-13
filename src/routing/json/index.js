const express = require('express');
const fs = require('fs');
const router = express.Router();
const { readDataFromFile } = require('../../tools/TxtFileReader');

module.exports = basePath => {
    const JSON_A_RESPONSE = fs.readFileSync(`${basePath}/json-a.json`);
    const jsonResponseA = JSON.parse(JSON_A_RESPONSE);

    router.get('/json-a', (req, res) => res.json(jsonResponseA));

    router.get('/json-b', (req, res) => {
        const path = `${basePath}/json-b.json`;
        const callback = data => res.send(JSON.parse(data));
        readDataFromFile(path, callback);
    });

    return router;
};
