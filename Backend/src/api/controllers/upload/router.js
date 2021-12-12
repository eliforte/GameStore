const express = require('express');
const upload = require('./index');

const router = express.Router({ mergeParams: true });

router.post('/:id', upload)

module.exports = router;