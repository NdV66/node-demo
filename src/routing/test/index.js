const express = require('express');
const router = express.Router();

const DEFAULT_RESPONSE = { test: { ok: true } };

router.get('/test', (req, res) => res.json(DEFAULT_RESPONSE));

module.exports = router;
