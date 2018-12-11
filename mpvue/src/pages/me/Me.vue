<template>
  <div class="container">
    <div class="userInfo">
      <img class="avatar" :src="userInfo.avatarUrl" :alt="userInfo.nickName">
      <button class="nickName" open-type="getUserInfo" @getuserinfo="doLogin">{{userInfo.nickName}}</button>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userInfo.openId' class="btn" @click="scanCode">添加图书</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { post, showSuccess } from '@/utils/index'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
    doLogin (e) {
      // qcloud.request({
      //   url: config.userUrl,
      //   login: true,
      //   success: (userRes) => {
      //     console.log('userRes', userRes)
      //     showSuccess('登录成功')
      //     wx.setStorageSync('userinfo', userRes.data.data)
      //     this.userinfo = userRes.data.data
      //   }
      // })
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: (userInfo) => {
            showSuccess('登录成功')
            wx.setStorageSync('userInfo', userInfo)
            this.userInfo = userInfo
          },
          fail: (err) => {
            console.log('登录失败', err)
          }
        })
      }
    },
    async addBook (isbn) {
      const res = await post('/weapp/addBook', {
        isbn,
        openid: this.userInfo.openId
      })
      console.log(res)
      if (res.code === 0 && res.data.title) {
        showSuccess(`${res.data.title}\n添加成功`)
      }
    },
    scanCode () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
    } else {
      this.userInfo = {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  width: 100%;
  padding: 0 30px;
  .userInfo {
    margin-top:100rpx;
    text-align:center;
    .avatar {
      width: 128px;
      height: 128px;
      border-radius: 50%;
    }
    .nickName {
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
</style>
