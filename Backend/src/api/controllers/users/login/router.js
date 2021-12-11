const express = require('express');
const login = require('./login');

const router = express.Router({ mergeParams: true });

router.post('/', login);

module.exports = router;