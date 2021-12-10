require('dotenv').config;
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const messages = require('../../global/messages');
const modelUsers = require('../../models/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (body) => {
  const token = jwt.sign({ data: body }, process.env.SECRET, jwtConfig);
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(UNAUTHORIZED).json(messages.MISSING_TOKEN_401);
    }
    const decoded = jwt.verify(authorization, process.env.SECRET);
    const { email } = decoded.data;
    const foundedEmail = await modelUsers.findByEmail(email);
    if (!foundedEmail) return next(messages.JWT_MALFORMED_401);
    req.user = decoded.data;
    next(); 
  } catch (err) {
    next(messages.JWT_MALFORMED_401);
  }
}

module.exports = {
  createToken,
  verifyToken,
};