const rescue = require('express-rescue');
const { ACCEPTED } = require('http-status-codes').StatusCodes;
const service = require('../../services/games');

module.exports = rescue(async (req, res, next) => {
  const { name, price, quantity } = req.body;
  const game = await service.createGame({ name, price, quantity }, req.user);
  if (game.message) return next(game);
  console.log(game);
  return res.status(ACCEPTED).json();
});