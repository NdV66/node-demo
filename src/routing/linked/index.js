const express = require('express');
const router = express.Router();

module.exports = path => {
    const callbackRouter = require('./callback')(path);
    const promiseRouter = require('./promise')(path);
    const awaitRouter = require('./await')(path);

    router.use('/callback', callbackRouter);
    router.use('/promise', promiseRouter);
    router.use('/await', awaitRouter);

    return router;
};
