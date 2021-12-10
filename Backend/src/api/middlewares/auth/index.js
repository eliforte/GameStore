require('dotenv').config;
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
    
  } catch (err) {
    next()
  }
}