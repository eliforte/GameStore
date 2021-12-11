const modelGame = require('../../models/games');
const messages = require('../../global/messages');

const createGame = async ({ name, price, quantity }, infoUser) => {
  if (!name || !price || !quantity || !infoUser) {
    return messages.INVALID_ENTRIES_400;
  }
  const { _id: userId } = infoUser;
  const newGame = await modelGame.create({ name, price, quantity, image, userId });
  return newGame;
};

module.exports = {
  createGame,
};