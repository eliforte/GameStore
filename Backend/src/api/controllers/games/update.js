const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const updateGame = await service.updateGame(id, req.body);
  return res.status(OK).json(updateGame);
});