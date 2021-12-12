const express = require('express');
const uploadController = require('./post');
const uploadMiddleware = require('../../middlewares/upload');

const router = express.Router({ mergeParams: true });

router.post('/image/:id', uploadMiddleware.single('file'), uploadController);

module.exports = router;