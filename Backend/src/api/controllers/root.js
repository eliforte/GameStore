const express = require('express');
const routerRegister = require('./users/register/router');
const routerUpdoad = require('./upload/router');
const routerGames = require('./games/router');
const routerLogin = require('./users/login/router')
const validation = require('../middlewares/validation');
const root = express.Router({ mergeParams: true });

root.use('/register', validation.register, routerRegister);
root.use('/login', validation.login, routerLogin);
root.use('/games', routerUpdoad, routerGames);

module.exports = root;
