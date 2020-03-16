const express = require('express');
const router = express.Router();
const fs = require('promise-fs');
const { convertBuffersToString, removeTxtExtension } = require('./helper');

const prepareDataToSend = (filenamesWithNoExtension, contents) => (value, index) => ({
    value,
    name: filenamesWithNoExtension[index],
    id: contents[index],
});

const prepareContents = async (filenames, namesPath) => {
    const promises = filenames.map(file => fs.readFile(`${namesPath}/${file}`));
    const buffers = await Promise.all(promises);
    return convertBuffersToString(buffers);
};

const prepareValues = async (contents, valuesPath) => {
    const promises = contents.map(value => fs.readFile(`${valuesPath}/${value}.txt`));
    const buffers = await Promise.all(promises);
    return convertBuffersToString(buffers);
};

const prepareFilenames = async namesPath => {
    const filenames = await fs.readdir(namesPath);
    const filenamesWithNoExtension = filenames.map(removeTxtExtension);

    return { filenames, filenamesWithNoExtension };
};

const onPromise_GET = async (namesPath, valuesPath, onSuccess, onError) => {
    try {
        const { filenames, filenamesWithNoExtension } = await prepareFilenames(namesPath);
        const contents = await prepareContents(filenames, namesPath);
        const values = await prepareValues(contents, valuesPath);

        const data = values.map(prepareDataToSend(filenamesWithNoExtension, contents));

        onSuccess(data);
    } catch (e) {
        onError();
    }
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
