const express = require('express');
const create = require('./create');
const findById = require('./findById');
const list = require('./list');
const remove = require('./remove');
const update = require('./update');
const validade = require('../../middlewares/validation');

const router = express.Router({ mergeParams: true });

router.get('/', list);
router.post('/register',validade.gameRegister, create);
router.get('/:id', findById);
router.put('/:id',validade.gameRegister, update);
router.delete('/:id', remove);

module.exports = router;