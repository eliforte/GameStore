const bodyParser = require('body-parser');
const express = require('express');
const root = require('./controllers/root');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;