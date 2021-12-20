const modelGame = require('../../models/games');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const messages = require('../../global/error/messages');
const { ObjectId } = require('mongodb');

const validadeId = (id) => {
  if (!ObjectId.isValid(id)) return NewError(messages.INVALID_ID_400);
};

const createGame = async ({ name, price, quantity }, infoUser) => {
  if (!name || !price || !quantity) return NewError(messages.INVALID_ENTRIES_400);
  const gameExist = await modelGame.findByName(name);
  if (gameExist) return NewError(messages.GAME_EXIST_409)
  const { _id: userId } = infoUser;
  const newGame = await modelGame.create({ name, price, quantity, userId });
  return newGame;
};

const listGames = async () => await modelGame.listGame();

const findGame = async (id) => {
  validadeId(id);
  const game = await modelGame.findById(id);
  if (!game) return NewError(messages.GAME_NOT_EXIST_404);
  return game;
};

const updateGame = async (id, infoGames) => {
  validadeId(id);
  const { _id: removeId, ...restInforGames } = infoGames;
  const game = await modelGame.updateGame(id, restInforGames);
  if (!game) return NewError(messages.GAME_NOT_EXIST_404);
  return game;
};

const removeGame = async (id) => {
  validadeId(id);
  await modelGame.removeGame(id);
};

const addImage = async (id, url) => {
  validadeId(id);
  const game = await modelGame.findById(id);
  if (!game) return NewError(messages.GAME_NOT_EXIST_404);
  const { image, ...inforGames } = game;
  const newGame = { ...inforGames, image: url };
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