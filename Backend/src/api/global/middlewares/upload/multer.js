require('dotenv').config();
const multer = require('multer');
const path = require('path');
const service = require('../../../services/games');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  local: multer.diskStorage({
    destination: async (req, file, callback) => {
      const { id } = req.params;
      const game = await service.findGame(id);
      if (!game) callback(message.INVALID_ID_400);
  
      callback(null, 'src/uploads/');
    },
    filename: (req, file, callback) => {
      const { id } = req.params;
      file.key = `${id}.jpeg`;
      callback(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'upload-game-store',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, callback) => {
      const { id } = req.params;
      const newTitle = `${id}.jpeg`;
      callback(null, newTitle);
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
};