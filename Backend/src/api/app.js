const express = require('express');
const http = require('http');
const { Server, Socket } = require('socket.io');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const root = require('./controllers/root');
const error = require('./middlewares/error');

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cors());
app.use(root);
app.use(error);

module.exports = { serverHttp, io };