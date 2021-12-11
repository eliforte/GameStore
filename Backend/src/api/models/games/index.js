const { client } = require('../connection');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'games';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ name, price, quantity, image, userId }) => {
  const newGame = await userCollection.insertOne({ name, price, quantity, image, userId });
  return newGame;
};

module.exports = {
  create,
};