const express = require('express');
const routerRegister = require('./users/register/router');

const root = express.Router({ mergeParams: true });

root.use('/register', routerRegister);

module.exports = root;
