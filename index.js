const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const MiniLogger = require('mini-logger')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
const config = require('./config')
require('./connectDB')
const port = 3000

var miniLogger = MiniLogger({
  dir: config.paths.logDir,
  categories: [ 'http', 'router','model','controller'],
  format: 'YYYY-MM-DD-[{category}][.log]'
});

app.use(koaStatic(config.paths.staticFilesPath, {
  gzip: true,
  maxage: 31536000000,
}))

app.use(bodyParser())

app.use(logger())

app.use(async (ctx, next) => {
  const {request} = ctx;
  miniLogger.http('%s %s', request.method, request.originalUrl)
  next();  
})

app.use(router.routes())

app.use(async (ctx, next) => {
  const {request, response} = ctx;
  miniLogger.error('%s %s %s', response.status, request.method, request.originalUrl)
  next();  
})

app.listen(port, (err) => {
  if(!err) {
    console.log(`listening on http://127.0.0.1:${port}`)
  }
})

app.on('error', (err, ctx) => {
  miniLogger.error(err);
})

