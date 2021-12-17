const mongoConnection = require('./connectionMock');

const create = async ({ email, password, repeatPassword }) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const { insertedId: id } = await usersCollection
    .insertOne({ email, password, repeatPassword });

  return {
    id,
  };
};

const findByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection();

  const foundUser = await usersCollection.findOne({ email });

  return foundUser;
};

module.exports = {
  create,
  findByEmail,
};