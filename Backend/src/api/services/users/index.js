const modelUser = require('../../models/users');
const auth = require('../../global/middlewares/auth');
const messages = require('../../global/error/messages');

const createUser = async ({ email, password, repeatPassword }) => {
  const userExist = await modelUser.findByEmail(email);
  if (userExist) return messages.EMAIL_EXIST_409;

  return modelUser.create({ email, password, repeatPassword });
};

const loginUser = async ({ email, password }) => {
  const userExist = await modelUser.findByEmail(email);
  if (!userExist) return messages.USER_NOT_EXIST_404;
  if (userExist.email !== email || userExist.password !== password) {
    return messages.INCORRECT_401;
  };

  const { password: passwordDB, repeatPassword: repeatDB, ...userWithoutPassword } = userExist;

  return auth.createToken(userWithoutPassword);
};

module.exports = { 
  createUser,
  loginUser,
};
