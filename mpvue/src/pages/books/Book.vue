<template>
  <div class="container">
    <div v-if="bookList.length !== 0">
      <BookSwiper v-if="!noData" :top='top'></BookSwiper>
      <BookCard :key="num" v-for="(book, num) in bookList" :book='book'>
      </BookCard>
    </div>
    <p v-else class='text-center'>
      暂时没有数据
    </p>
    <p class='text-footer' v-if='!more'>
      没有更多数据
    </p>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import BookSwiper from '@/components/BookSwiper'
import BookCard from '@/components/BookCard'
export default {
  components: {
    BookSwiper,
    BookCard
  },
  data () {
    return {
      top: [],
      bookList: [],
      page: 0,
      more: true,
      noData: false
    }
  },
  methods: {
    async BooksTop () {
      const res = await get('/weapp/bookTop', {})
      this.top = res.data.top
      console.log(this.top)
    },
    async BookList (first) {
      // 首次
      if (first) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const res = await get('/weapp/bookList', {page: this.page})
      // 还地判断请求是不是到最后一页了
      if (res.data.bookList < 10 && this.page > 0) {
        this.more = false
      }
      if (first) {
        this.bookList = res.data.bookList
        if (this.bookList.length === 0) {
          this.noData = true
        }
        wx.stopPullDownRefresh()
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        // 不能无限追加，还地判断请求是不是到最后一页了
        this.bookList = this.bookList.concat(res.data.bookList)
      }
      wx.hideNavigationBarLoading()
    }
  },
  onShow () {
    this.BooksTop()
    this.BookList(true)
  },
  /* todo 请求api调用多了几次 */
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.BookList()
  },
  onPullDownRefresh () {
    this.BooksTop()
    this.BookList(true)
  }
}
</script>

<style scoped lang='scss'>
</style>
