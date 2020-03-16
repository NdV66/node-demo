const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

const HEADER_NAME = 'X-JSON-Data';

const removeWhiteChar = text => text.replace('\n', '');

const spawnScript = (path, paramForScript, callback) => {
    const results = [];
    const child = spawn(`node ${path}/strings.js`, [paramForScript], { shell: true });

    child.on('exit', () => callback(results));
    child.stderr.on('data', err => console.log(err));
    child.stdout.on('data', data => results.push(removeWhiteChar(data.toString())));
};

module.exports = path => {
    router.get('/strings', (req, res) => {
        const header = req.get(HEADER_NAME);
        const paramForScript = JSON.parse(header).param;
        const callback = output => res.send(output);

        spawnScript(path, paramForScript, callback);
    });

    return router;
};
