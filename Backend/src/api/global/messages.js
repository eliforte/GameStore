const { UNAUTHORIZED, CONFLICT } = require('http-status-codes').StatusCodes;

const JWT_MALFORMED_401 = { message: 'Jwt malformed', status: UNAUTHORIZED };
const MISSING_TOKEN_401 = { message: 'Missing auth token', status: UNAUTHORIZED };
const EMAIL_EXIST_409 = { message: 'Email already registered', status: CONFLICT };
const INCORRECT_401 = { message: 'Incorrect username or password', status: 401 };
const NOT_FOUND_404 = { message: 'User not exist', status: 404 };

module.exports = {
  JWT_MALFORMED_401,
  MISSING_TOKEN_401,
  EMAIL_EXIST_409,
  INCORRECT_401,
  NOT_FOUND_404,
};
