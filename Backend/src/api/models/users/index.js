const { client } = require('../connection');

const DB_NAME = 'GameStore';
const DB_COLLECTION = 'users';

const userCollection = client.db(DB_NAME).collection(DB_COLLECTION);

const create = async ({ name, password, email }, typeRole) => {
  const newUser = await userCollection.insertOne({ name, password, email, role: typeRole });
  return {
    user: {
      name,
      email,
      role: typeRole,
      _id: newUser.insertedId,
    },
  };
};

module.exports = {
  create,
}