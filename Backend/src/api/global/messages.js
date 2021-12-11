const { UNAUTHORIZED, CONFLICT, NOT_FOUND } = require('http-status-codes').StatusCodes;

const JWT_MALFORMED_401 = { message: 'Jwt malformed', status: UNAUTHORIZED };
const MISSING_TOKEN_401 = { message: 'Missing auth token', status: UNAUTHORIZED };
const EMAIL_EXIST_409 = { message: 'Email already registered', status: CONFLICT };
const INCORRECT_401 = { message: 'Incorrect username or password', status: UNAUTHORIZED };
const USER_NOT_EXIST_404 = { message: 'User not exist', status: NOT_FOUND };
const GAME_NOT_EXIST_404 = { message: 'Game not exist', status: NOT_FOUND };

module.exports = {
  JWT_MALFORMED_401,
  MISSING_TOKEN_401,
  EMAIL_EXIST_409,
  INCORRECT_401,
  USER_NOT_EXIST_404,
  GAME_NOT_EXIST_404,
};
