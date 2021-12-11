const express = require('express');
const register = require('./index');

const router = express.Router({ mergeParams: true });

router.post('/', register);

module.exports = router;