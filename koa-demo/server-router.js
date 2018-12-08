const Koa = require('koa')
const Router = require('koa-router');
const app = new Koa()
const router = new Router()

router.get('/', async(ctx,next) => {
  ctx.body = '孙悟空'
})
router.get('/zhubajie', async(ctx,next) => {
  ctx.body = '猪八戒'
})
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen('3000')
