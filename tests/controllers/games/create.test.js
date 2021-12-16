const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../../../src/api/server');
const { getConnection } = require('../../connectionMock');

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /games/register', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('GameStore').collection('games').deleteMany({});
    await connectionMock.db('GameStore').collection('users').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('1 - Quando o usuário não tem um token', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/games/register')
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
        .post('/games/register')
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

  describe('3 - Quando o campo name é vazio', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: 'email@email.com',
        password: 'senhasenha',
        repeatPassword: 'senhasenha',
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'senhasenha',
        }).then((res) => res.body.token);
    
      response = await chai.request(server)
        .post('/games/register')
        .send({ name: '', price:  8, quantity: 5 })
        .set('authorization', token);
    });

    it('Retorna status code "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "\"name\" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equals('\"name\" is not allowed to be empty');
    });
  });

  describe('4 - Quando o campo price é vazio', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: 'email@email.com',
        password: 'senhasenha',
        repeatPassword: 'senhasenha',
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'senhasenha',
        }).then((res) => res.body.token);
    
      response = await chai.request(server)
        .post('/games/register')
        .send({ name: 'lol', price: '', quantity: 5 })
        .set('authorization', token);
    });

    it('Retorna status code "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "\"price\" must be a number"', () => {
      expect(response.body.message).to.be.equals('\"price\" must be a number');
    });
  });

  describe('5 - Quando o campo quantity é vazio', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: 'email@email.com',
        password: 'senhasenha',
        repeatPassword: 'senhasenha',
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'senhasenha',
        }).then((res) => res.body.token);
    
      response = await chai.request(server)
        .post('/games/register')
        .send({ name: 'lol', price: 8, quantity: '' })
        .set('authorization', token);
    });

    it('Retorna status code "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "\"quantity\" must be a number"', () => {
      expect(response.body.message).to.be.equals('\"quantity\" must be a number');
    });
  });

  describe('6 - Quando o game é criado com sucesso', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: 'email@email.com',
        password: 'senhasenha',
        repeatPassword: 'senhasenha',
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: 'senhasenha',
        }).then((res) => res.body.token);
    
      response = await chai.request(server)
        .post('/games/register')
        .send({ name: 'lol', price: 8, quantity: 4 })
        .set('authorization', token);
    });

    it('Retorna status code "202"', () => {
      expect(response).to.have.status(202);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "Successfully created game!"', () => {
      expect(response.body.message).to.be.equals('Successfully created game!');
    });
  });
});