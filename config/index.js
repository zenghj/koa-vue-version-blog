const path = require('path')

exports.paths = {
  staticFilesPath: path.resolve(__dirname, '../web/dist/static'),
  logDir: path.resolve(__dirname, '../log'),
}

exports.DBHost = 'mongodb://localhost:27017/my-blog'

exports.urls = {
  auth: 'http://47.95.13.52/api/account/user/auth',
  // auth: 'http://127.0.0.1:2333/api/account/user/auth',
}