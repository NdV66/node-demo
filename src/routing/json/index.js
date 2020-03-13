const express = require('express');
const fs = require('fs');
const router = express.Router();

module.exports = basePath => {
    const DEFAULT_RESPONSE = fs.readFileSync(`${basePath}/json-a.json`);
    const jsonResponse = JSON.parse(DEFAULT_RESPONSE);

    router.get('/json-a', (req, res) => res.json(jsonResponse));

    return router;
};
