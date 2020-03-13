const fs = require('fs');
const DEFAULT_PORT = 3456;

const readDataFromTxtFile = (path, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            callback(DEFAULT_PORT);
        } else {
            callback(data);
        }
    });
};

module.exports = { readDataFromTxtFile };
