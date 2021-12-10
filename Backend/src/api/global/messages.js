const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;

const JWT_MALFORMED_401 = { message: 'jwt malformed', status: UNAUTHORIZED };
const MISSING_TOKEN_401 = { err: { message: 'missing auth token', status: UNAUTHORIZED } };

module.exports = {
  JWT_MALFORMED_401,
  MISSING_TOKEN_401
};