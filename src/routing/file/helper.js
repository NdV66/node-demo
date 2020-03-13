const fs = require('fs');
const { readDataFromFile } = require('../../tools/TxtFileReader');

const sendFileAsyncAsPlainText = (res, file, basePath) => {
    const path = `${basePath}/${file}`;
    const callback = data => res.send(data).toString();
    const onError = () => res.status(500).send('Error');
    readDataFromFile(path, callback, onError);
};

const getFilesizeInBytes = path => {
    const stats = fs.statSync(path);
    const fileSizeInBytes = stats['size'];
    return fileSizeInBytes;
};

const getFilenames = (path, callback, filter = () => true) => {
    fs.readdir(path, (err, files) => {
        const namedFiles = files.filter(filter).map(file => ({ name: file }));
        callback(namedFiles);
    });
};

const getFilenamesWithSizes = (path, callback) => {
    fs.readdir(path, (err, files) => {
        const namedFiles = files.map(name => ({ name, size: getFilesizeInBytes(`${path}/${name}`) }));
        callback(namedFiles);
    });
};

module.exports = { sendFileAsyncAsPlainText, getFilenames, getFilenamesWithSizes, getFilesizeInBytes };
