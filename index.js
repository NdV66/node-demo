const express = require('express');
const app = express();
const DEFAULT_PORT = 3456;
const port = DEFAULT_PORT;

app.listen(port, () => console.log(`Node demo is listing on port: ${port}!`));
