const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    /* 链表获取添加人 */
    const id = ctx.request.query.id
    let bookInfo = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info as user_info')
        .join('cSessionInfo', 'books.openid', '=', 'cSessionInfo.open_id')
        .where('books.id', id)
        .first()
    // 注意和bookList的区别，这个只有一条数据，进过knex first()处理后变成对象
    const info = JSON.parse(bookInfo.user_info)
    bookInfo = Object.assign({}, bookInfo, {
        tags: bookInfo.tags.split(','),
        summary: bookInfo.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            avatarUrl: info.avatarUrl
        }
    })

    ctx.state = {
        code: 0,
        data: {
            bookInfo: bookInfo
        }
    }

    /* count累加 */
    await mysql('books')
        .select('*')
        .where('id', id)
        .increment('count', 1)
}
