const express = require('express');
const create = require('./create');
const findById = require('./findById');
const list = require('./list');
const remove = require('./remove');
const update = require('./update');
const validade = require('../../middlewares/validation');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', list);
router.post('/register',auth.verifyToken, validade.gameRegister, create);
router.get('/:id', findById);
router.put('/:id',auth.verifyToken, validade.gameRegister, update);
router.delete('/:id',auth.verifyToken, remove);

module.exports = router;