const { getConnection } = require('./connectionMock');

const findByEmail = async (email) => {
  const userColletion = await getConnection()
    .then((db) => db.db('GameStore'))
    .then((collec) => collec.collection('users'));
  const foundUser = await userColletion.findOne({ email });
  return foundUser;
};

const createUser = async ({ email, password, repeatPassword }) => {
  const userColletion = await getConnection()
    .then((db) => db.db('GameStore'))
    .then((collec) => collec.collection('users'));
  const newUser = await userColletion.insertOne({ email, password, repeatPassword });
  const list = await userColletion.find().toArray();
  console.log(list);
  return newUser;
};

module.exports = { 
  findByEmail,
  createUser,
};