# GameStore API

API desenvolvida para fazer o controle de um database de uma Game Store.

## Ferramentas utilizadas

A aplicação foi toda desenvolvida usando linguagem [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) em [Noje.js](https://nodejs.org/en/docs/)
utilizando o [Express](https://expressjs.com/pt-br/). Para validações do corpo das requisições foi usado o [Joi](https://www.npmjs.com/package/joi). Validações de 
login dos usuários feita com o [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken). Foi utilizado [MongoDB](https://www.mongodb.com/) como database e 
[MongoDB Atlas](https://www.mongodb.com/atlas/database) para o armazenamento em nuvem do database e utilizando o S3 do [AWS](https://aws.amazon.com/pt/) para
disponibilização em nuvem de arquivos.

Deploy da aplicação feita na plataforma gratuita de hospedagem [Heroku](https://id.heroku.com/).

## Requisições e End-Points

Todas as requisições devem ser feitas para a URL [https://game-store-14.herokuapp.com/](https://game-store-14.herokuapp.com/).

### Autenticação de usuário

#### REGISTRO

Para poder adicionar, editar, remover ou realizar comprar de jogos, o usuário tera que ser cadastrado no site, caso contrário, não conseguirá
realizar essas ações.

O cadrastro deve ser feito por um requisição do tipo <strong>POST</strong> para o endpoint <code>/register</code>, contendo as seguites informações:

```json
{
  "email": "email@exemplo.com",
  "password": "senhasenha",
  "repeatPassword": "senhasenha"
}
```

Todos os campos são obrigatórios e deve ser informado um email válido para o cadastro ser concluído.
Exemplos de erros que podem retornar:

<strong>Campo email não preenchido:</strong>
```json
{
  "message": "\"email\" is not allowed to be empty"
}
```

<strong>Email inválido:</strong>

```json
{
  "message": "\"email\" must be a valid email"
}
```

<strong>Registro realizado com sucesso:</strong>
// retorno ainda não implementado

```json
{
  "massage": "User created successfully!"
}
```

#### LOGIN

O login do usuário deve ser feito em uma requisição do tipo <strong>POST</strong> para o endpoint <code>/login</code>. Email e senha deve ser os mesmos utilizados
no registro e ambos os campos são obrigatórios. Após feito o login, o usuário tem acesso ao token de autenticação para poder criar, editar, remover ou comprar games.

<strong>Campo não preenchido:</strong>

```json
{
  "message": "\"password\" is not allowed to be empty"
}
```

<strong>Email ou senha inválidos:</strong>

```json
{
  "message": "Incorrect username or password"
}
```
<strong>Login realizado com sucesso:</strong>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYjgyNWJkNWVkYjU0ZGYwN2QyMDcwMSIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIn0sImlhdCI6MTYzOTQ1ODgwMCwiZXhwIjoxNjQwMDYzNjAwfQ.WYIeVRXq_AtG3QdZhVjregogHs2cXlBBLQ9P3hGu4Mk"
}
```

### Listagem de Games

Para fazer a listagem de todos os jogos faça uma requisição do tipo <strong>GET</strong> para o endpoint <code>/games</code> e o retorno dever ser um array
com todos os jogos disponíveis do banco, como por exemplo:

```json
[
  {
    "_id": "61b7debf28efdadb9320a401",
    "name": "Call of Duty",
    "price": 3,
    "quantity": 5,
    "userId": "61b679f28c796346fe862884",
    "image": "https://game-store-14.herokuapp.com/61b7debf28efdadb9320a401.jpeg"
  },
  {
    "_id": "61b7df0d28efdadb9320a402",
    "name": "God Of War",
    "price": 3,
    "quantity": 2,
    "userId": "61b679f28c796346fe862884",
    "image": "https://game-store-14.herokuapp.com/61b7df0d28efdadb9320a402.jpeg"
   },
]

```
