const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const root = require('./controllers/root');
const error = require('./middlewares/error');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;