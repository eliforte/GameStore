const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let mongoServer;
let urlMock;

const getConnection = async () => {
  if (mongoServer) {
    return MongoClient.connect(urlMock, OPTIONS);
  };

  mongoServer = new MongoMemoryServer;
  urlMock = await mongoServer.getUri();

  return MongoClient.connect(urlMock, OPTIONS);
};

module.exports = { getConnection };