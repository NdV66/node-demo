const express = require('express');
const router = express.Router();

const DB = new Map();

const sendOk = res => res.json({ ok: true });
const sendError = res => res.status(500).json({ error: true });

router.put('/:id', (req, res) => {
    const { id } = req.params;

    if (DB.has(id)) {
        sendError(res);
    } else {
        DB.set(id, req.body);
        sendOk(res);
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = DB.get(id);

    data ? res.json(data) : sendError(res);
});

module.exports = router;
