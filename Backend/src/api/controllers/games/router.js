const express = require('express');
const create = require('./create');
const findById = require('./findById');
const validade = require('../../middlewares/validation');

const router = express.Router({ mergeParams: true });

router.post('/register',validade.gameRegister, create);
router.get('/:id', findById)

module.exports = router;