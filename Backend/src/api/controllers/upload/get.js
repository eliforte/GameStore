const rescue = require('express-rescue');
// const service = require('../../services/games');
const { OK } = require('http-status-codes').StatusCodes;

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
});