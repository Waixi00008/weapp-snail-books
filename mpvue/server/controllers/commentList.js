const {
    mysql
} = require('../qcloud')

module.exports = async (ctx) => {
    /* 链表获取添加人 */
    const bookid = ctx.request.query.id
    const openid = ctx.request.query.openid
    const page = ctx.request.query.page || 0
    const size = ctx.request.query.size || 10

    let mysqlSelect = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info as user_info')
        .join('cSessionInfo', 'comments.openid', '=', 'cSessionInfo.open_id')
        .limit(size)
        .offset(Number(page) * size)
        .orderBy('comments.id', 'desc')

    let commentList = []
    if (bookid) {
      // 图书详情页面的评论
      commentList = await mysqlSelect.where('comments.bookid', bookid)
    } else if (openid) {
      // 自己评论过的
      commentList = await mysqlSelect.where('comments.openid', openid)
    }
    // const commentList = await mysql('comments')
    //     .select('comments.*', 'cSessionInfo.user_info as user_info')
    //     .join('cSessionInfo', 'comments.openid', '=', 'cSessionInfo.open_id')
    //     .where('comments.bookid', bookid)
    //     .limit(size)
    //     .offset(Number(page) * size)
    //     .orderBy('comments.id', 'desc')
    console.log(commentList)
    ctx.state = {
        code: 0,
        data: {
            /* 处理user_info */
            commentList: commentList.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    user_info: {
                        nickName: info.nickName,
                        avatarUrl: info.avatarUrl
                    }
                })
            })
        }
    }
}
