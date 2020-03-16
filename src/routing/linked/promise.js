const express = require('express');
const router = express.Router();
const fs = require('promise-fs');
const { processValueFromFile, removeTxtExtension } = require('./helper');

const waitForAll = promises => Promise.all(promises);

const convertBuffersToString = buffers => buffers.map(processValueFromFile);

const prepareDataToSend = (values, data) =>
    values.map((value, index) => ({
        value,
        id: data.values[index],
        name: removeTxtExtension(data.filenames[index]),
    }));

const onPromise_GET = (namesPath, valuesPath, onSuccess, onError) => {
    const tmpData = {};

    const saveTmp = (value, key) => {
        tmpData[key] = value;
        return value;
    };

    fs.readdir(namesPath)
        .then(filenames => saveTmp(filenames, 'filenames'))
        .then(filenames => filenames.map(file => fs.readFile(`${namesPath}/${file}`)))
        .then(waitForAll)
        .then(convertBuffersToString)
        .then(values => saveTmp(values, 'values'))
        .then(values => values.map(value => fs.readFile(`${valuesPath}/${value}.txt`)))
        .then(waitForAll)
        .then(convertBuffersToString)
        .then(values => prepareDataToSend(values, tmpData))
        .then(onSuccess)
        .catch(onError);
};

module.exports = path => {
    router.get('/', (req, res) => {
        const namesPath = `${path}/names`;
        const valuesPath = `${path}/values`;

        const onSuccess = data => res.json(data);
        const onError = () => res.status(500).send('Error');

        onPromise_GET(namesPath, valuesPath, onSuccess, onError);
    });

    return router;
};
