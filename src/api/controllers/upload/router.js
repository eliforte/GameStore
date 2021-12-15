const express = require('express');
const multer = require('multer');
const multerConfig = require('../../global/middlewares/upload/multer')
const uploadController = require('./post');

const router = express.Router({ mergeParams: true });

router.post('/image/:id', multer(multerConfig).single('file'), uploadController);

module.exports = router;