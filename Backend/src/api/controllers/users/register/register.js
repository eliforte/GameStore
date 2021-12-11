const rescue = require('express-rescue');
const { CREATED } = require('http-status-codes').StatusCodes;
const service = require('../../../services/users');

module.exports = rescue(async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;
  const newUser = await service.createUser({ email, password, repeatPassword });
  if (newUser.message) return next(newUser);

  return res.status(CREATED);
});