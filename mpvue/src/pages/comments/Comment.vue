<template lang="html">
  <div class="container" v-if='userInfo.openId'>
    <CommentList  :commentList='commentList' :type='user'/>
    <div class="page-title">
      我的图书
    </div>
    <BookCard :key='book.id' v-for='book in bookList' :book='book'/>
    <div v-if='!bookList.length'>暂时还没添加过书，快去添加几本把</div>
  </div>
  <div v-else class="tips">请先登录</div>
</template>

<script>
import { get } from '@/utils/index'
import CommentList from '@/components/CommentList'
import BookCard from '@/components/BookCard'
export default {
  components: {
    CommentList,
    BookCard
  },
  data () {
    return {
      commentList: [],
      bookList: [],
      userInfo: {}
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.commentDetail()
      this.bookDetail()
      wx.hideNavigationBarLoading()
    },
    async bookDetail () {
      const res = await get('/weapp/bookList', { openid: this.userInfo.openId })
      console.log('bookList', res)
      this.bookList = res.data.bookList
    },
    async commentDetail () {
      const res = await get('/weapp/commentList', { openid: this.userInfo.openId })
      this.commentList = res.data.commentList
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userInfo.openId) {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background:#eee;
  .page-title {
    padding-left: 10px;
  }
}
.tips {
  margin: 200px auto;
  text-align: center;
}
</style>

