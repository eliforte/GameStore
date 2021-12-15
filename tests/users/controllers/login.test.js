require('dotenv').config();
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const server = require('../../../src/api/server');
const { getConnection } = require('../../connectionMock');

const { expect } = chai;

chai.use(chaiHttp);

const EMAIL = 'email@email.com';
const EMAIL_INVALID = 'email@email';
const EMAIL_NOT_EXIST = 'senha@senha.com';
const PASSWORD = 'senhasenha';
const PASSWORD_INCORRECT = 'emailemail';

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('1 - Quando o campo email está vazio', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ password: PASSWORD });
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

    it('a propriedade "message" contém o texto "\"email\" is required"', () => {
      expect(response.body.message).to.be.equals('\"email\" is required');
    });
  });

  describe('2 - Quando o campo password está vazio', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ email: EMAIL });
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

    it('a propriedade "message" contém o texto "\"password\" is required"', () => {
      expect(response.body.message).to.be.equals('\"password\" is required');
    });
  });

  describe('3 - Quando o formato do email é inválido', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ email: EMAIL_INVALID, password: PASSWORD });
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

    it('a propriedade "message" contém o texto "\"email\" must be a valid email', () => {
      expect(response.body.message).to.be.equals('\"email\" must be a valid email');
    });
  });

  describe('4 - Quando o email não é cadastrado', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ email: EMAIL_NOT_EXIST, password: PASSWORD });
    });

    it('Retorna status code "404"', () => {
      expect(response).to.have.status(404);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "User not exist', () => {
      expect(response.body.message).to.be.equals('User not exist');
    });
  });

  describe('5 - Quando o email ou senha estão incorretos', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({ email: EMAIL, password: PASSWORD_INCORRECT });
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

    it('a propriedade "message" contém o texto "Incorrect username or password', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('6 - Quando o login é realizado com sucesso', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: EMAIL,
        password: PASSWORD,
      });

      response = await chai.request(server)
        .post('/login')
        .send({ email: EMAIL, password: PASSWORD });
    });

    it('Retorna status code "202"', () => {
      expect(response).to.have.status(202);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('a propriedade "token" tem um token JWT válido', () => {
      const token = response.body.token;
      const userWithoutPassword = jwt.verify(token, process.env.SECRET);

      expect(userWithoutPassword.data.email).to.be.equals(EMAIL);
    });
  });
});