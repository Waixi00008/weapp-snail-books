const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  /*链表获取添加人 */
  const page = ctx.request.query.page || 0
  const size = ctx.request.query.size || 10
  console.log(page,size)
  const bookList = await mysql('books')
    .select('books.*','cSessionInfo.user_info as user_info')
    .join('cSessionInfo', 'books.openid', '=', 'cSessionInfo.open_id')
    .limit(size)
    .offset(Number(page) * size)
    .orderBy('books.id', 'desc')
  ctx.state = {
    code: 0,
    data: {
      /* 处理user_info */
      bookList: bookList.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
            user_info: {
                nickName: info.nickName
            }
        })
      })
    }
  }
}
