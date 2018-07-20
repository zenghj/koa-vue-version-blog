const Router = require('koa-router');
const {Article} = require('../db');

router = new Router();


router.get('/test', (ctx, next) => {
  ctx.body = 'hello world';
  console.log(ctx)
})

router.post('/article', async (ctx, next) => {
  Article.$create({
    ...ctx.request.body
  })
  .then(doc => {
    console.log(doc);
    ctx.body = {
      state: 1,
      msg: '发布成功',
      result: doc,
    }
  })
})

module.exports = router
