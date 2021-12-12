const modelGame = require('../../models/games');
const messages = require('../../global/messages');

const createGame = async ({ name, price, quantity }, infoUser) => {
  if (!name || !price || !quantity) {
    return messages.INVALID_ENTRIES_400;
  }
  const { _id: userId } = infoUser;
  const newGame = await modelGame.create({ name, price, quantity, userId });
  return newGame;
};

const addImage = async (id) => {
  const game = await modelGame.findById(id);
  const image = `localhost:3000/src/uploads/${id}.jepg`;
  const newGame = { ...game, image };
  const createImage = await modelGame.updateGame(id, newGame);
  return createImage;
};

module.exports = {
  createGame,
};