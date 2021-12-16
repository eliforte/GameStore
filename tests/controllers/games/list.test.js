const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../../../src/api/server');
const { getConnection } = require('../../connectionMock');
const dataBase = require('../../mockDataBase');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /games', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock).cleanup
    await connectionMock.db('GameStore').collection('games');
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('1 - Quando listar os games', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/games')
    });

    
    it('Retorna status code "200"', () => {
      console.log('resposta do banco', response);
      expect(response).to.have.status(200);
    });

    it('array de resposta possui o length maior que 0', () => {
      expect(response.body.length).to.not.equals(0);
    });

    it('o retorno deve ser o array do database', () => {
      expect(response.body).to.be.an('array');
    });
  });
});