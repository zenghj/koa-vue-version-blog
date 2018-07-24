const fs = require('fs')
const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const apiRouter = require('./api')
const checkAuth = require('../middlewares/checkAuth')


router = new Router()
router.get('/admin', checkAuth, async ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../web/dist/admin.html'));
})
router.get('/client', checkAuth, async ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../web/dist/client.html'));
})
router.use('/api', apiRouter.routes())

module.exports = router
