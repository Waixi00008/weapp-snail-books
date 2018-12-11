// 工具函数库
import config from '../config'

export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data = {}, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method,
      data,
      header,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  })
}
// export function get (url) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: config.host + url,
//       success: function (res) {
//         if (res.data.code === 0) {
//           resolve(res.data.data)
//         } else {
//           reject(res.data)
//         }
//       }
//     })
//   })
// }

export function showModal (title, content = '') {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}
