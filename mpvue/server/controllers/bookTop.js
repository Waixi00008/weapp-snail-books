const {mysql} = require('../qcloud')
const array = require('lodash/array')

module.exports = async (ctx) => {
    const booksTop = await mysql('books')
        .select('id', 'count', 'updated_at', 'isbn', 'imageUrl')
        .orderBy('count', 'desc', 'updated_at', 'desc')
        .limit(9)

    // loadash chunk
    let top = array.chunk(booksTop, 3)
    ctx.state = {
        code: 0,
        data: {
            top: top
        }
    }
}
