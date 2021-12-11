const express = require('express');
const create = require('./create');

const router = express.Router({ mergeParams: true });

router.post('/register', create);

module.exports = router;