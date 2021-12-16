const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../../../src/api/server');
const { getConnection } = require('../../connectionMock');

const { expect } = chai;

chai.use(chaiHttp);

const EMAIL = 'email@email.com';
const EMAIL_INVALID = 'email@email';
const PASSWORD = 'cachorrolouco';
const PASSWORD_INCORRECT = 'emailemail'; 
const NEW_EMAIL = 'novoqw@email.com';

describe('POST /register', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('GameStore').collection('users').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('1 - Quando o campo email está vazio', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/register')
        .send({ email: '', password: PASSWORD, repeatPassword: PASSWORD });
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

    it('a propriedade "message" contém o texto "\"email\" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equals('\"email\" is not allowed to be empty');
    });
  });

  describe('2 - Quando o campo password está vazio', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/register')
        .send({ email: EMAIL, password: '', repeatPassword: PASSWORD });
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

    it('a propriedade "message" contém o texto "\"password\" is not allowed to be empty"', () => {
      expect(response.body.message).to.be.equals('\"password\" is not allowed to be empty');
    });
  });

  describe('3 - Quando o campo repeatPassword está vazio ou diferente de password', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/register')
        .send({ email: EMAIL, password: PASSWORD, repeatPassword: PASSWORD_INCORRECT });
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

    it('a propriedade "message" contém o texto "\"repeatPassword\" must be [ref:password]"', () => {
      expect(response.body.message).to.be.equals('\"repeatPassword\" must be [ref:password]');
    });
  });

  describe('4 - Quando o email já está cadastrado', () => {
    let response;
    before(async () => {
      const users = connectionMock.db('GameStore').collection('users');

      await users.insertOne({
        email: EMAIL,
        password: PASSWORD,
        repeatPassword: PASSWORD,
      });

      response = await chai.request(server)
        .post('/register')
        .send({ email: EMAIL, password: PASSWORD, repeatPassword: PASSWORD });
    });

    after(async () => {
      await connectionMock.db('GameStore').collection('users').deleteMany({});
    });

    it('Retorna status code "409"', () => {
      expect(response).to.have.status(409);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" contém o texto "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

  describe('5 - Quando o email é inválido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/register')
        .send({ email: EMAIL_INVALID, password: PASSWORD, repeatPassword: PASSWORD });
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
  
  describe('6 - Quando o usuário é criado com sucesso', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/register')
        .send({ password: PASSWORD, repeatPassword: PASSWORD, email: 'new@email.com' });
    });

    it('Retorna status code "201"', () => {
      
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" contém o texto "Successfully created user!"', () => {
      expect(response.body.message).to.be.equals('Successfully created user!');
    });
  });
});