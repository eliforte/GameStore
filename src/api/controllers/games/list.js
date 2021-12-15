const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (_req, res, _next) => {
  const list = await service.listGames();
  return res.status(OK).json(list);
});