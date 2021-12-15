require('dotenv').config();
const { serverHttp } = require('./app');

const PORT = process.env.PORT || 3000;

serverHttp.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = serverHttp;