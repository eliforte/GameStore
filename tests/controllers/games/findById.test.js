const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../../../src/api/server');
const { getConnection } = require('../../connectionMock');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /games/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock).cleanup
    await connectionMock.db('GameStore').collection('games');
  });

  after(() => {
    MongoClient.connect.restore();
    await connectionMock.db('GameStore').collection('games').deleteMany({});
    await connectionMock.db('GameStore').collection('users').deleteMany({});
  });

  describe('1 - Quando o usuário não tem um token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/games/:id')
        .send({});
    });

    it('Retorna status code "401".', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "Missing auth token".', () => {
      expect(response.body.message).to.be.equals('Missing auth token');
    });
  });

  describe('2 - Quando o token é inválido', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: 'emai@email.com',
        password: 'senhasenha',
        repeatPassword: 'senhasenha',
      });

      await chai.request(server)
        .post('/login')
        .send({
          email: 'emai@email.com',
          password: 'senhasenha',
        }).then((res) => res.body.token);
    
      response = await chai.request(server)
        .get('/games/:id')
        .send({})
        .set('authorization', 'xxxxxxxxxxx')
    });

    it('Retorna status code "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "Jwt malformed"', () => {
      expect(response.body.message).to.be.equals('Jwt malformed');
    });
  });
});