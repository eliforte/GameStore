const express = require('express');
const routerRegister = require('./users/register/router');
const routerGames = require('./games/router');
const routerLogin = require('./users/login/router')
const validationLogin = require('../middlewares/validation/login');

const root = express.Router({ mergeParams: true });

root.use('/register', routerRegister);
root.use('/login', validationLogin, routerLogin);
root.use('/register-game', routerGames);

module.exports = root;