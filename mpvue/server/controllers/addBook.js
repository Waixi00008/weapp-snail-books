const https = require('https')
const {mysql} = require('../qcloud')
// 获取豆瓣信息再入库
// https://api.douban.com/v2/book/isbn/9787536692930
module.exports = async (ctx) => {
    const {isbn, openid} = ctx.request.body
    if (openid && isbn) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = `https://api.douban.com/v2/book/isbn/${isbn}`
        const bookinfo = await getJSON(url)
        const tags = bookinfo.tags ? (
            bookinfo.tags.map(v => {
                return `${v.title} ${v.count}`
            }).join(',')
        ) : ''
        // 处理数据
        let book = {
            isbn,
            openid,
            title: bookinfo.title,
            imageUrl: bookinfo.images ? bookinfo.images.large : {},
            alt: bookinfo.alt,
            publisher: bookinfo.publisher,
            summary: bookinfo.summary,
            price: bookinfo.price,
            rate: bookinfo.rating ? bookinfo.rating.average : 0,
            tags,
            author: bookinfo.author.join(',')
        }
        // 添加数据
        try {
            await mysql('books').insert(book)
            ctx.state = {
                code: 0,
                data: {
                    title: book.title,
                    msg: 'success'
                }
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                  resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
