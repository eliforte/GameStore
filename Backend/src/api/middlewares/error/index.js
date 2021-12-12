const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err.message) return res.status(err.status).json({ message: err.message });
  console.log(err.message);
  return res.status(INTERNAL_SERVER_ERROR);
};