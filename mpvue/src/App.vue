<script>
import config from '@/config'
export default {
  async created () {
    const res = await config.get('/weapp/demo')
    console.log(123, res)
    wx.request({
      url: config.host + '/weapp/demo',
      success: function (res) {
        console.log(res)
      }
    })
    console.log('小程序启动了')
  }
}
// import qcloud from 'wafer2-client-sdk'
// import config from './config'
// export default {
//   async created () {
//     // 小程序现在不能够弹窗授权了，只能点击button
//     // 下面代码无法执行
//     let userInfo = wx.getStorageSync('userInfo')
//     if (!userInfo) {
//       qcloud.setLoginUrl(config.loginUrl)
//       qcloud.login({
//         success: function (userInfo) {
//           console.log('登录成功', userInfo)
//           wx.setStorageSync('userInfo', userInfo)
//         },
//         fail: function (err) {
//           console.log('登录失败', err)
//         }
//       })
//     }
//   }
// }
</script>

<style lang="scss">
.text-center {
  text-align: center;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
}
.text-primary{
  color:#EA5149;
}
.btn {
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  color: white;
  background: #ea5a49;
  border-radius: 2px;
  &:active {
    background: #fa5a49;
  }
}
</style>
