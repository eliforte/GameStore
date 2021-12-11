const express = require('express');
const routerRegister = require('./users/register');
const routerLogin = require('./users/login')
const validationLogin = require('../middlewares/validation/login');

const root = express.Router({ mergeParams: true });

root.use('/register', routerRegister);
root.use('/login', validationLogin, routerLogin);

module.exports = root;