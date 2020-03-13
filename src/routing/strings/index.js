const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const HEADER_NAME = 'X-JSON-Data';

const runScript = (path, paramForScript, callback) => {
    exec(`node ${path}/strings.js ${paramForScript}`, (error, stdout, stderr) => {
        console.log(stderr);
        callback(stdout);
    });
};

module.exports = path => {
    router.get('/strings', (req, res) => {
        const header = req.get(HEADER_NAME);
        const paramForScript = JSON.parse(header).param;
        const callback = output => res.send(output);

        runScript(path, paramForScript, callback);
    });

    return router;
};
