const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
    },
  }),
};
