const express = require('express');
const create = require('./create');
const findById = require('./findById');
const list = require('./list');
const remove = require('./remove');
const update = require('./update');
const validade = require('../../global/middlewares/validation');
const auth = require('../../global/middlewares/auth');
const updateDB = require('./updateDB');

const router = express.Router({ mergeParams: true });

router.get('/', list);
router.post('/register',auth.verifyToken, validade.gameRegister, create);
router.post('/purchase',auth.verifyToken, updateDB);
router.get('/:id', findById);
router.put('/:id',auth.verifyToken, validade.gameUpdate, update);
router.delete('/:id',auth.verifyToken, remove);

module.exports = router;