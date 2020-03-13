const express = require('express');
const router = express.Router();

const DB = new Map();

const sendOk = res => res.json({ ok: true });
const sendError = res => res.status(500).json({ error: true });

router.put('/data/:id', (req, res) => {
    const { id } = req.params;

    if (DB.has(id)) {
        sendError(res);
    } else {
        DB.set(id, req.body);
        sendOk(res);
    }
});

module.exports = router;
