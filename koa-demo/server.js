const Koa = require('koa')
//自定义中间件
const koaLogger = require('./koa-logger')
const app = new Koa()

function delay() {
  return new Promise((reslove,reject) => {
    setTimeout(() => {
      reslove()
    },3000)
  })
}
app.use(koaLogger)
app.use(async (ctx, next) => {
  ctx.body = '洋葱型中间件'
  await next()
})
app.use(async (ctx, next) => {
  ctx.body += '1'
  await next()
  ctx.body += '2'
})
app.use(async (ctx, next) => {
  ctx.body += '3'
  await delay()
  await next()
  ctx.body += '4'
})
app.use(async (ctx, next) => {
  ctx.body += '5'
  await next()
  ctx.body += '6'
})

app.listen('3000')
