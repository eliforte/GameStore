const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
  const foundGame = await service.findGame(id);
  if (foundGame.message) return next(foundGame);
  return res.status(OK).json(foundGame);
});