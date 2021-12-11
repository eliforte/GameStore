const rescue = require('express-rescue');
const { ACCEPTED } = require('http-status-codes').StatusCodes;
const service = require('../../../services/users');

module.exports = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const loginAccepted = await service.loginUser({ email, password });
  if (loginAccepted.message) return next(loginAccepted);
  res.user = loginAccepted;
  return res.status(ACCEPTED).json({ token: loginAccepted });
});