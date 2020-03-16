const express = require('express');
const router = express.Router();

module.exports = path => {
    const callbackRouter = require('./callback')(path);
    const promiseRouter = require('./promise')(path);

    router.use('/callback', callbackRouter);
    router.use('/promise', promiseRouter);

    return router;
};
