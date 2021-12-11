const { client } = require('../connection');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'users';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ email, password, repeatPassword }) => await userCollection.insertOne({ email, password, repeatPassword });

const findByEmail = async (email) => await userCollection.findOne({ email });

module.exports = {
  create,
  findByEmail,
};