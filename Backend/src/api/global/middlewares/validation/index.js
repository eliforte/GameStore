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

const SCHEMAGameRegister = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().required(),
});

const SCHEMAGameUpdate = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
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
  const { error } = SCHEMAGameRegister.validate({ name, price, quantity });
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const gameUpdate = rescue(async (req, _res, next) => {
  const { name, price, quantity } = req.body;
  const { error } = SCHEMAGameUpdate.validate({ name, price, quantity });
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

module.exports = {
  login,
  register,
  gameRegister,
  gameUpdate,
};