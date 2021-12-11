const Joi = require('joi');
const rescue = require('express-rescue');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

const SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = rescue(async (req, _res, next) => {
  const { error } = SCHEMA.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});