const { client } = require('../connection');
const { ObjectId } =  require('mongodb');
const message = require('../../global/error/messages');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'games';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ name, price, quantity, userId }) => await userCollection.insertOne({ name, price, quantity, userId });

const listGame = async () => await userCollection.find().toArray();

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return message.INVALID_ID_400;
  const game = await userCollection.findOne(ObjectId(id));
  return game;
}

const updateGame = async (id, infoGame) => {
  const { value } = await userCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: infoGame },
    { returnDocument: 'after', returnOriginal: false },
  );

  return value;
}

const removeGame = async (id) => await userCollection.deleteOne({ _id: ObjectId(id) });

module.exports = {
  create,
  listGame,
  findById,
  updateGame,
  removeGame,
};
