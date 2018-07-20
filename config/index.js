const path = require('path')

exports.paths = {
  staticFilesPath: path.resolve(__dirname, './web/dist/static'),
  logDir: path.resolve(__dirname, '../log'),
}

exports.DBHost = 'mongodb://localhost:27017/my-blog'