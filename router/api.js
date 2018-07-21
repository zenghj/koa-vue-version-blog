const Router = require('koa-router');
const {Article} = require('../db');
const {resErrorLog} = require('../lib/logger')

router = new Router();

function createCatchErrFn(ctx, msg) {
  return err => {
    resErrorLog(ctx, err)
    ctx.body = {
      state: -1,
      msg: msg || '接口响应失败',
    }
  }
}
router.get('/test', async (ctx, next, x) => {
  ctx.body = 'hello world';
  console.log(ctx)
})

// 创建文章： 发布 & 存草稿
router.post('/article', async (ctx, next, xx) => {
  await Article.$create({
    ...ctx.request.body
  })
  .then(doc => {
    console.log(doc)
    ctx.body = {
      state: 1,
      msg: '发布成功',
      result: doc,
    }
  })
  .catch(createCatchErrFn(ctx, '创建失败'))
})

router.get('/article/:id', async (ctx, next) => {
  await Article.$read(ctx.params)
    .then(doc => {
      ctx.body = {
        state: 1,
        result: doc,
      }
    })
    .catch(createCatchErrFn(ctx, '获取失败'))
})

router.get('/articles', async (ctx, next) => {
  await Article.$readList(ctx.query)
    .then(result => {
      ctx.body = {
        state: 1,
        result,
      }
    })
    .catch(createCatchErrFn(ctx))
})

router.put('/acticle/:id', async (ctx, next) => {
  await Article.$update({
    id,
    ...ctx.request.body
  })
  .then(result => {
    ctx.body = {
      state: 1,
      result,
    }
  })
})


// 移入回收站
// router.post('/article/:id', async (ctx, next) => {

// })

router.delete('/article/:id', async (ctx, next) => {
  await Article.$delete(ctx.params.id)
    .then((result) => {
      ctx.body = {
        state: 1,
        result
      }
    })
    .catch(createCatchErrFn(ctx))
})

module.exports = router
