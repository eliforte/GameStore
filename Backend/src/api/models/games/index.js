const { client } = require('../connection');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'games';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ name, price, quantity, userId }) => await userCollection.insertOne({ name, price, quantity, userId });

module.exports = {
  create,
};