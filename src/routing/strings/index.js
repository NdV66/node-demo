const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

const HEADER_NAME = 'X-JSON-Data';

const spawnScript = (path, paramForScript, res) => {
    const child = spawn(`node ${path}/strings.js`, [paramForScript], { shell: true });

    child.on('exit', () => res.end());
    child.stderr.on('data', err => console.log(err));
    child.stdout.on('data', data => res.write(data.toString()));
};

module.exports = path => {
    router.get('/strings', (req, res) => {
        const header = req.get(HEADER_NAME);
        const paramForScript = JSON.parse(header).param;

        spawnScript(path, paramForScript, res);
    });

    return router;
};
