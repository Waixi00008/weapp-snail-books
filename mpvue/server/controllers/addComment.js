const {
    mysql
} = require('../qcloud')
module.exports = async (ctx) => {
    const {
        openid,
        bookid,
        comment,
        phone,
        location
    } = ctx.request.body
    // 添加数据
    try {
        await mysql('comments').insert({
            openid,
            bookid,
            comment,
            phone,
            location
        })
        ctx.state = {
            code: 0,
            data: {
                msg: '添加评论成功'
            }
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '添加评论失败:' + e.sqlMessage
            }
        }
    }
}
