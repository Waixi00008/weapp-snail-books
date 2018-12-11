const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  /*链表获取添加人 */
  const id = ctx.request.query.id

  /*count累加 */
  const bookDetail = await mysql('books')
    .select('*')
    .where('id',id)
    .increment('count',1)

  ctx.state = {
    code: 0,
    data: {
      bookDetail
    }
  }
}
