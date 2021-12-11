const modelUser = require('../../models/users');
const auth = require('../../middlewares/auth');
const messages = require('../../global/messages');

const createUser = async ({ email, password, repeatPassword }) => {
  const userExist = await modelUser.findByEmail(email);
  if (userExist) return messages.EMAIL_EXIST_409;

  return modelUser.create({ email, password, repeatPassword });
};

const loginUser = async ({ email, password }) => {
  const userExist = await modelUser.findByEmail(email);
  if (!userExist) return messages.USER_NOT_EXIST_404;
  console.log(userExist);
  if (userExist.email !== email || userExist.password !== password) {
    return messages.INCORRECT_401;
  };

  const { password: passwordDB, ...userWithoutPassword } = userExist;

  return auth.createToken(userWithoutPassword);
};

module.exports = { 
  createUser,
  loginUser,
};
