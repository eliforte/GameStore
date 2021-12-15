const rescue = require('express-rescue');
const service = require('../../services/games');
const { NO_CONTENT } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  await service.removeGame(id);

  return res.status(NO_CONTENT).end();
});