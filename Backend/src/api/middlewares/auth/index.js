require('dotenv').config;
const jwt = require('jsonwebtoken');
const modelUsers = require('../../models/users');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (body) => {
  const token = jwt.sign({ data: body }, process.env.SECRET, jwtConfig);
  return token;
};
