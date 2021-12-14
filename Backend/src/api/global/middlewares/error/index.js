const { ApiError } = require('../../error/apiError');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;

const err = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = { err };