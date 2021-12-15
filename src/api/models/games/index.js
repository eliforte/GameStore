const { client } = require('../connection');
const { ObjectId } =  require('mongodb');
const message = require('../../global/error/messages');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'games';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ name, price, quantity, userId }) => await userCollection.insertOne({ name, price: Number(price), quantity: Number(quantity), userId });

const listGame = async () => await userCollection.find().toArray();

const findById = (id) => userCollection.findOne(ObjectId(id));

const updateGame = async (id, infoGame) => {
  const { value } = await userCollection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: infoGame },
    { returnDocument: 'after', returnOriginal: false },
  );

  return value;
}

const removeGame = async (id) => await userCollection.deleteOne({ _id: ObjectId(id) });

const findByName = async (name) => await userCollection.findOne({ name: { $regex: `/${name}/i` } })

module.exports = {
  create,
  listGame,
  findById,
  updateGame,
  removeGame,
  findByName,
};
