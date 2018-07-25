const path = require('path')

exports.urls = {
  auth: 'http://47.95.13.52/service/account/user/auth',
  // auth: 'http://127.0.0.1:2333/api/account/user/auth',
  appUrl: ''
}

exports.paths = {
  staticFilesPath: path.resolve(__dirname, '../web/dist/static'),
  logDir: path.resolve(__dirname, '../log'),
  admin: '/blog/admin',
  adminHtml: path.resolve(__dirname, '../web/dist/admin.html'),
  client: '/blog/client',
  clientHtml: path.resolve(__dirname, '../web/dist/client.html'),
  apiPrefix: '/blog/api',
  getUploadDestPath: (file) => {
    const date = new Date()
    const path = `/${date.getFullYear()}/${date.getMonth}/${date.getDay}/${date.getSeconds}`
    const serverPathPrefix =  `/apps/static/upload`
    return {
      path: `${serverPathPrefix}/${path}`,
      // url: 
    }
  }
}

exports.DBHost = 'mongodb://localhost:27017/my-blog'

