const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const apiRouter = require('./api')

router = new Router()
router.get('/admin', async ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../web/dist/admin.html'));
})
router.use('/api', apiRouter.routes())

module.exports = router
