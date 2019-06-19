const multerr = require('multer');
const path = require('path');

// exporta um objeto com as configs do multer
module.exports = {
    storage: new multerr.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
};