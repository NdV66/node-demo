const express = require('express');
const router = express.Router();

const sendOk = res => res.json({ ok: true });
const sendError = (res, code = 500) => res.status(code).json({ error: true });

module.exports = DB => {
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

        data ? res.json(data) : sendError(res, 404);
    });

    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        if (DB.has(id)) {
            DB.delete(id);
            sendOk(res);
        } else {
            sendError(res);
        }
    });

    return router;
};
