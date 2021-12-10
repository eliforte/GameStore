const modelUser = require('../../models/users');
const auth = require('../../middlewares/auth');
const messages = require('../../global/messages');
const validation = require('../../middlewares/validation');

const createUser = async ({ email, password, repeatPassword }) => {
  const userExist = await modelUser.findByEmail(email);
  if (userExist) return messages.EMAIL_EXIST_409;

  return modelUser.create({ email, password, repeatPassword });
};

module.exports = { 
  createUser,
};
