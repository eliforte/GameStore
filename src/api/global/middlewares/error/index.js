const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

module.exports = (err, _req, res, _next) => {
  if (err && err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(INTERNAL_SERVER_ERROR).end();
};
