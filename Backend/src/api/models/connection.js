require('dotenv').config();

const { MongoClient } = require('mongodb');
const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27014/GameStore`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_DB_URL, OPTIONS);

const connection = async () => {
  try {
    client.connect();
  } catch (err) {
    console.log('Connection failed');
  }
};

connection();

module.exports = { client };
