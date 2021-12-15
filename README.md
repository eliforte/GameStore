# GameStore API

API desenvolvida para fazer o controle de um database de uma Game Store.

![GitHub followers](https://img.shields.io/github/followers/eliforte?style=social)

## Sobre
  Aplicação desenvolvida por [Elias Forte](https://github.com/eliforte).
  
### Contatos
<a targer="_blank" href="https://twitter.com/Eli_fortee"><img src="https://img.icons8.com/fluency/48/000000/twitter.png"/></a>
<a targer="_blank" href="https://www.instagram.com/eliifort/"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png"/></a>
<a targer="_blank" href="https://www.linkedin.com/in/elias-forte/"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/></a>

## Ferramentas utilizadas

A aplicação foi toda desenvolvida usando linguagem [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) em [Noje.js](https://nodejs.org/en/docs/)
utilizando o [Express](https://expressjs.com/pt-br/). Para validações do corpo das requisições foi usado o [Joi](https://www.npmjs.com/package/joi). Validações de 
login dos usuários feita com o [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken). Foi utilizado [MongoDB](https://www.mongodb.com/) como database e 
[MongoDB Atlas](https://www.mongodb.com/atlas/database) para o armazenamento em nuvem do database e utilizando o S3 do [AWS](https://aws.amazon.com/pt/) para
disponibilização em nuvem de arquivos.

Deploy da aplicação feita na plataforma gratuita de hospedagem [Heroku](https://id.heroku.com/).

### Testes

Foram feitos teste de integração, cobrindo 100% da aplicação, usando as ferramentas [Chai](https://www.npmjs.com/package/chai) para fazer as asserções junto
com plug-in [Chai-Http](https://www.npmjs.com/package/chai-http) e o [Mongo-Memory-Server](https://www.npmjs.com/package/mongodb-memory-server), que respectivamente,
foram usados para realizar as requisições <code>HTTP</code> para o servidor criado em memória. Com os [Sion](https://www.npmjs.com/package/sinon) foram feitos os
mocks necessários.

*Obs: teste em desenvolvimento*

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

<strong>Usuario não cadastrado:</strong>

```json
{
  "message": "User not exist"
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

### Games

#### LISTAGEM DE GAMES

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

#### BUSCAR GAME PELO ID

Para fazer a busca de um único game, deve ser feito uma requisição do tipo <strong>GET</strong> para o endpoint <code>/games/:id</code>, informando o id do game.
Tendo o retorno da seguinte forma:

```json
{
  "_id": "61b80f079eeb9b77d9d03bfe",
  "name": "Crash, Tag Team Racing",
  "price": 3,
  "quantity": 4,
  "userId": "61b679f28c796346fe862884",
  "image": "https://upload-game-store.s3.amazonaws.com/61b80f079eeb9b77d9d03bfe.jpeg"
}

```

<strong>Se o ID do game estiver no formato incorreto, exibe o retorno:</strong>

```json
{
  "message": "Invalid game ID"
}
```

<strong> Se o game não existir, exibe o retorno:</strong>

```json
{
  "message": "Game not exist"
}
```
#### CRIANDO GAME

Para criar um game, o usuário deve está logado com um token válido, fazendo uma requisição do tipo <strong>POST</strong> para o endpoint <code>/games/register</code>. 
Os campos <code>name</code>, <code>price</code>, <code>quantity</code> são obrigatórios.

<strong>Campo vazio:</strong>

```json
{
  "message": "\"name\" is not allowed to be empty"
}

```

<strong>Usuário sem token:</strong>

```json
{
  "message": "Missing auth token",
  "status": 401
}

```

<strong>Token inválido:</strong>

```json
{
  "message": "Jwt malformed"
}
```
<strong>Game criado com sucesso:</strong>

```json
{
  "message": "Successfully created game!"
}
```

#### ADICIONANDO IMAGENS AOS GAMES

Após criar o game na rota <code>/games/register</code>, no database ele ficara desta forma:

```json
{
  "_id": "61b8e5dd1a0577e965f9818a",
  "name": "Call Of Duty",
  "price": 3,
  "quantity": 7,
  "userId": "61b825bd5edb54df07d20701"
}
```

Todo novo jogo é criado sem imagem. Para adicionar a imagem faça uma requisição do tipo <strong>POST</strong> para o endpoint <code>/games/image/:id</code>.
O usuário deve está autenticado para fazer o upload da imagem, o <code>ID</code> deve ser válido e o deve existir . É importante resaltar que o <code>ID</code> da rota <code>
/games/image/:id</code>, se refere ao <code>ID</code> do novo game cadastrado no database. Faça uma nova requisição de listagem, para obter o <code>ID</code> do game e envie
esse mesmo <code>ID</code> na requisição <strong>POST</strong> para que a imagem seja alocada com o game certo. Após seguir esses passos, retornara da API a mensagem:
  
```json
{
  "message": "Upload completed successfully!"
}
```
  
<strong>No database ficara desta forma:</strong>  

```json
{
  "_id": "61b8e5dd1a0577e965f9818a",
  "name": "Call Of Duty",
  "price": 3,
  "quantity": 7,
  "userId": "61b679f28c796346fe862884",
  "image": "https://upload-game-store.s3.amazonaws.com/61b8e5dd1a0577e965f9818a.jpeg"
}
```

<strong>Se o ID do game estiver no formato incorreto, exibe o retorno:</strong>

```json
{
  "message": "Invalid game ID"
}
```

<strong> Se o game não existir, exibe o retorno:</strong>

```json
{
  "message": "Game not exist"
}
```

#### ATUALIZANDO DADOS DOS GAMES

A atualização deve ser feita por uma requisição do tipo <strong>PUT</strong> para o endpoit <code>/games/:id</code>. O usuário deve está autenticado para fazer a atualização,
o <code>ID</code> deve ser válido e o jogo existir. O <code>ID</code> do item a ser modificado, exemplo: 

```json
{
  "_id": "61b8e5dd1a0577e965f9818a",
  "name": "Call Of Duty",
  "price": 3,
  "quantity": 7,
  "userId": "61b679f28c796346fe862884",
  "image": "https://upload-game-store.s3.amazonaws.com/61b8e5dd1a0577e965f9818a.jpeg"
}
```

Enviando o <code>"_id": "61b8e5dd1a0577e965f9818a"</code> na rota correta, o com o campo ```json { "name": "Need For Speed" } ```, o retorno será:

```json
{
  "_id": "61b8e5dd1a0577e965f9818a"
  "name": "Need For Speed",
  "price": 3,
  "quantity": 7,
  "userId": "61b679f28c796346fe862884",
  "image": "https://upload-game-store.s3.amazonaws.com/61b8e5dd1a0577e965f9818a.jpeg"
}
```
#### REMOVENDO GAMES

Aplicação permite somente remoção de um jogo por requisição. Para fazer a remoção, o usuário deve está autenticado, deve informar um <code>ID</code> válido de um jogo que existe
no database. A requisição deve ser do tipo <strong>DELETE</strong> para o endpoint <code>/games/:id</code>. A resposta da API sera um status code <code>204 No Content</code>.
Em casos de erros, podem sugir as seguintes retornos: 

<strong>Se o ID do game estiver no formato incorreto, exibe o retorno:</strong>

```json
{
  "message": "Invalid game ID"
}
```

<strong> Se o game não existir, exibe o retorno:</strong>

```json
{
  "message": "Game not exist"
}
```

<strong>Usuário sem token:</strong>

```json
{
  "message": "Missing auth token",
  "status": 401
}

```

<strong>Token inválido:</strong>

```json
{
  "message": "Jwt malformed"
}
```

### Contribuições

Caso você queria fazer alguma contribuição, fique a vontade para comentar, fazer pull resquests. Toda ajuda a melhorar o código é bem vinda :D!

##
