require('dotenv').config()
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb+srv://${process.env.USER}:${process.env.SECRET_MONGODB}@cluster0.oksz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
