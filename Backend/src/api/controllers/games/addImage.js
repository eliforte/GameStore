const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const image = await service.addImage(id);
  return res.status(OK).json(image);
});
