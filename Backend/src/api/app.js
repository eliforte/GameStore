const bodyParser = require('body-parser');
const express = require('express');
const root = require('./controllers/root');

const app = express();

app.use(bodyParser.json());
app.use(root);

module.exports = app;