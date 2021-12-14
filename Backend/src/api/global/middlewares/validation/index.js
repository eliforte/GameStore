const Joi = require('joi');
const rescue = require('express-rescue');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

const SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const SCHEMARegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref('password'),
});

const SCHEMAGame = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().required(),
});

const login = rescue(async (req, _res, next) => {
  const { error } = SCHEMALogin.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const register = rescue(async (req, _res, next) => {
  const { error } = SCHEMARegister.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const gameRegister = rescue(async (req, _res, next) => {
  const { name, price, quantity } = req.body;
  const { error } = SCHEMAGame.validate({ name, price, quantity });
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

module.exports = {
  login,
  register,
  gameRegister,
};