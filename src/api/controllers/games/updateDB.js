const rescue = require('express-rescue');
const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, _next) => {
  const { purshare } = req.body;
  await Promise.all(
    purshare.map((game) => {
      return service.updateGame(game._id, game);
    })
  );
  return res.status(OK).json({ message: 'Successful purchase!!' });
});