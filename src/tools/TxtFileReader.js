const fs = require('fs');
const DEFAULT_PORT = 3456;

const defaultOnError = err => console.log(err);

const readDataFromFile = (path, callback, onError = defaultOnError) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            onError(err);
        } else {
            callback(data);
        }
    });
};

const onReadPortError = callback => callback(DEFAULT_PORT);

const readPortFromTxtFile = (path, callback) => {
    readDataFromFile(path, callback, onReadPortError);
};

module.exports = { readDataFromFile, readPortFromTxtFile };
