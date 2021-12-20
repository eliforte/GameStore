const rescue = require('express-rescue');
const { ACCEPTED } = require('http-status-codes').StatusCodes;
const service = require('../../services/games');

module.exports = rescue(async (req, res, next) => {
  const { name, price, quantity } = req.body;
  await service.createGame({ name, price, quantity }, req.user);
  return res.status(ACCEPTED).json({ message: 'Successfully created game!' });
});