const express = require('express');
const register = require('./register');

const router = express.Router({ mergeParams: true });

router.post('/', register);

module.exports = router;