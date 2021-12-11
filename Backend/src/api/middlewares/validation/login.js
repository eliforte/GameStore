const Joi = require('joi');
const rescue = require('express-rescue');

const SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = rescue(async (req, res, next) => {
  const { error } = SCHEMA.validate(req.body);
  if (error) return next();
  next();
});