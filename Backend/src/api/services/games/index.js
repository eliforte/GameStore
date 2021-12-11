const modelGame = require('../../models/games');
const messages = require('../../global/messages');

const createGame = async ({ name, price, quantity, image }, infoUser) => {
  const { _id: userId } = infoUser;
  const newGame = await modelGame.create({ name, price, quantity, image, userId });
  return newGame;
};

module.exports = {
  createGame,
};