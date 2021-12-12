require('dotenv').config()
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGODB_URL;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_DB_URL, OPTIONS);

const connection = async () => {
  try {
    client.connect();
    client.on('error', (error) => console.error(error));
    client.once('open', () => console.log('Connected to the database!'));
  } catch (err) {
    console.log('Connection failed');
  }
};

connection();

module.exports = { client };
