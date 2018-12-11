<template lang="html">
    <div class="container">
      <BookInfo :bookInfo='bookInfo'></BookInfo>
      <CommentList :commentList='commentList'/>
      <div class="comment" v-if="showAdd">
        <textarea v-model="comment" class="textarea" placeholder="请输入图书短评" maxlength="150"></textarea>
        <div class='location'>
          地理位置:
          <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
          <span class='text-primary'>{{location}}</span>
        </div>
        <div class='phone'>
          手机型号:
          <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
          <span class='text-primary'>{{phone}}</span>
        </div>
        <div class="btn" @click="addComment">
          添加评论
        </div>
      </div>
      <div v-else class='tips'>
        未登录或者已经评论过啦
      </div>
      <button class="btn share" open-type="share">分享好友</button>
    </div>
</template>

<script>
import { get, post, showSuccess } from '@/utils/index'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  components: {
    BookInfo,
    CommentList
  },
  props: {},
  data () {
    return {
      bookid: '',
      comment: '',
      bookInfo: [],
      location: '',
      phone: '',
      userInfo: {},
      commentList: []
    }
  },
  methods: {
    async addComment () {
      const res = await post('/weapp/addComment', {
        openid: this.userInfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      })
      if (res.code === 0) {
        showSuccess(`${res.data.msg}`)
      }
      this.comment = ''
      this.phone = ''
      this.location = ''
      // 请求评论列表
      this.commentDetail(this.bookid)
    },
    async commentDetail (id) {
      const res = await get('/weapp/commentList', { id })
      this.commentList = res.data.commentList
    },
    async BookDetail (id) {
      const res = await get('/weapp/bookDeatil', { id })
      this.bookInfo = res.data.bookInfo
      wx.setNavigationBarTitle({
        title: this.bookInfo.title
      })
    },
    getGeo (e) {
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
            const url = 'http://api.map.baidu.com/geocoder/v2/'
            wx.request({
              url,
              data: {
                ak: 'Z17xAPs1E5W6OolWLOHxMhw99EohKA5d',
                location: `${res.latitude},${res.longitude}`,
                output: 'json'
              },
              method: 'GET',
              success: (res) => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phone = wx.getSystemInfoSync()
        this.phone = phone.model
      } else {
        this.phone = ''
      }
    }
  },
  computed: {
    showAdd () {
      // 没登录
      if (!this.userInfo.openId) {
        return false
      }
      // 评论页面里查到有自己的openid
      // 需求是，每本书只能评论一次
      if (this.commentList.filter(v => v.openid === this.userInfo.openId).length) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.commentDetail(this.bookid)
    this.BookDetail(this.bookid)
    this.userInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style scoped lang="scss">
.container {
  .comment {
    margin-top: 10px;
    padding: 5px 10px;
    .textarea {
      width: 100%;
      height: 200rpx;
      background: #eee;
      &:active {
        border: 1px solid #EA5149;
      }
    }
    .location {
      margin-top: 10px;
      padding: 5px 10px;
    }
    .phone {
      margin-top: 10px;
      padding: 5px 10px;
    }
  }
  .tips {
    margin-top: 10px;
    color: #EA5149;
    text-align: center;
  }
  .share {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
