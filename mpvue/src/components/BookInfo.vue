<template lang="html">
  <div class="book-info">
    <div class="thumb">
      <img class="bg" :src="bookInfo.imageUrl" mode="aspectFill"></img>
      <img class="avatar" :src="bookInfo.imageUrl" mode="aspectFit"></img>
      <div class="info">
        <div class="title">
          {{bookInfo.title}}
        </div>
        <div class="author">
          {{bookInfo.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img class="avatar" :src="userinfo.avatarUrl" :alt="userinfo.nickName">
      {{userinfo.nickName}}
      <div class="right text-primary">
        {{bookInfo.rate}}分 <Star :value="bookInfo.rate"></Star>
      </div>
    </div>
    <div class="detail">
      出版社:{{bookInfo.publisher}}
      <div class="right">
        ￥:{{bookInfo.price}}
      </div>
    </div>
    <div class="badge" :key="tag" v-for="tag in bookInfo.tags">
      {{tag}}
    </div>
    <div class="summary" :key="i" v-for="(summary,i) in bookInfo.summary">
      {{summary}}
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import Star from '@/components/Star'
export default {
  components: {
    Star
  },
  props: ['bookInfo'],
  data () {
    return {
      bookInfo: []
    }
  },
  methods: {
    async BookDetail (id) {
      const res = await get('/weapp/bookDeatil', {id})
      this.bookInfo = res.data.bookInfo
      console.log('bookInfo', this.bookInfo)
    }
  },
  computed: {
    userinfo () {
      return this.bookInfo.user_info || {}
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {

  }
}
</script>

<style scoped lang="scss">
.book-info {
  font-size: 14px;
  .thumb {
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .bg {
      width: 100%;
      height: 100%;
      filter: blur(15px);
    }
    .avatar {
      width:100%;
      height:300rpx;
      position: absolute;
      left: 0;
      top: 30rpx;
    }
    .info {
      width: 100%;
      height: 100rpx;
      position: absolute;
      left: 0;
      top: 340rpx;
      text-align: center;
      color: white;
      line-height: 30px;
      .title {
        font-size: 20px;
      }
    }
  }
  .right{
    float: right;
  }
  .badge {
    display: inline-block;
    margin:5px;
    padding: 5px;
    color: '#EA5149';
    border: 1px solid #EA5149;
    border-radius: 10px;
  }
  .summary {
    margin-top:10px;
    padding:5px 10px;
    p {
      font-size:14px;
      text-indent: 2em;
    }
  }
  .detail {
    margin-top: 10px;
    padding:5px 10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
