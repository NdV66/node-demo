const express = require('express');
const fs = require('fs');
const router = express.Router();

module.exports = basePath => {
    const DEFAULT_RESPONSE = fs.readFileSync(`${basePath}/file-a.txt`).toString();

    router.get('/file-a', (req, res) => res.send(DEFAULT_RESPONSE));

    return router;
};
