const modelGame = require('../../models/games');
const { ApiError: { NewError } } = require('../../global/middlewares/error');
const messages = require('../../global/error/messages');

const createGame = async ({ name, price, quantity }, infoUser) => {
  if (!name || !price || !quantity) {
    return NewError(messages.INVALID_ENTRIES_400);
  }
  const { _id: userId } = infoUser;
  const newGame = await modelGame.create({ name, price, quantity, userId });
  return newGame;
};

const listGames = async () => await modelGame.listGame();

const findGame = async (id) => {
  if (!id) return messages.INVALID_ID_400;
  const game = await modelGame.findById(id);
  if (!game) return messages.GAME_NOT_EXIST_404;
  return game;
};

const updateGame = async (id, infoGames) => {
  const game = await modelGame.updateGame(id, infoGames);
  if (!game) return messages.GAME_NOT_EXIST_404;
  return game;
};

const removeGame = async (id) => {
  if (!id) return messages.GAME_NOT_EXIST_404;
  await modelGame.removeGame(id);
};

const addImage = async (id, url) => {
  if(!id) return messages.INVALID_ID_400;
  const game = await modelGame.findById(id);
  const newGame = { ...game, image: url };
  const createImage = await modelGame.updateGame(id, newGame);
  return createImage;
};

module.exports = {
  createGame,
  listGames,
  findGame,
  updateGame,
  removeGame,
  addImage,
};