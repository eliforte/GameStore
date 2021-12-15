const rescue = require('express-rescue');
const service = require('../../services/games');

const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, next) => {
  const { location: url } = req.file;
  const { id } = req.params;
  const newGame = await service.addImage(id, url);
  if (newGame.message) return next(newGame)
  console.log(req.file);

  return res.status(OK).json({ message: 'Upload completed successfully!' })
});
