const express = require('express');
const create = require('./create');

const router = express.Router({ mergeParams: true });

router.post('/', create);

module.exports = router;