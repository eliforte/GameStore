const multer = require('multer');
const service = require('../../services/games');
const message = require('../../global/messages');

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const { id } = req.params;
    const game = await service.findById(id);
    if (!game) callback(message.INVALID_ID_400);

    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const newTitle = `${id}.jepg`;
    callback(null, newTitle);
  },
});

module.exports = multer({ storage });