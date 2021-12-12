const express = require('express');
const upload = require('./index');

const router = express.Router({ mergeParams: true });

router.post('/image/:id', upload);

module.exports = router;