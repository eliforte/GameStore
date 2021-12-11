const { UNAUTHORIZED, CONFLICT } = require('http-status-codes').StatusCodes;

const JWT_MALFORMED_401 = { message: 'jwt malformed', status: UNAUTHORIZED };
const MISSING_TOKEN_401 = { message: 'missing auth token', status: UNAUTHORIZED };
const EMAIL_EXIST_409 = { message: 'Email already registered', status: CONFLICT };

module.exports = {
  JWT_MALFORMED_401,
  MISSING_TOKEN_401,
  EMAIL_EXIST_409
};
