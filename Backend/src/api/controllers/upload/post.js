const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
  const newGame = await service.addImage(id);
  if (newGame.message) return next(newGame)
  return res.status(OK).json({ message: 'Arquivo enviado com sucesso!'});
});
