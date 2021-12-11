const express = require('express');
const routerRegister = require('./users/register/router');
const routerGames = require('./games/router');
const routerLogin = require('./users/login/router')
const validation = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const root = express.Router({ mergeParams: true });

root.use('/register', validation.register, routerRegister);
root.use('/login', validation.login, routerLogin);
root.use('/game', auth.verifyToken, validation.game, routerGames);

module.exports = root;