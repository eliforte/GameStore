const express = require('express');
const login = require('./index');

const router = express.Router({ mergeParams: true });

router.post('/', login);

module.exports = router;