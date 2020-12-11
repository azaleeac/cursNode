const path = require('path');

module.exports = {
    PORT: 4000,
    mongoUrl: 'mongodb://localhost:27017/aries-3',
    uploadPath: path.resolve(__dirname, '../../app/uploadedFiles')
}