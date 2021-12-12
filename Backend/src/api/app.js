const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uploadMiddleware = require('./middlewares/upload');
const uploadController = require('./controllers/upload');
const root = require('./controllers/root');
const error = require('./middlewares/error');

const app = express();
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.post(
  '/files/upload',
  uploadMiddleware.single('file'),
  uploadController,
);
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;