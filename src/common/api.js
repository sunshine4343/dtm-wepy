/**
 * Created by limx on 2018/2/24.
 */
import wepy from 'wepy'
import config from './config'

var api = {
  post: function (route, params) {
    let self = this
    return new Promise((resolve, reject) => {
      var token = wepy.getStorageSync('token')
      console.log(token)
      var data = {
        url: config.apiUrl + route,
        data: params,
        method: 'POST',
        success: function (response) {
          if (response.statusCode == 200) {
            data = response.data
            console.log('接口返回数据：', data)
            if (data.success) {
              resolve(data)
            } else {
              if (data.errorCode == 700) {
                wepy.redirectTo({
                  url: '/pages/login'
                })
              }
              reject(data)
            }
          }
        },
        fail: reject
      };
      if (token) {
        data.header = { 'X-DTM-TOKEN': token };
      }
      wepy.request(data);
    }).catch(res => {
      if (res.success === false) {
        wepy.showModal({
          title: '提示',
          content: res.errorMessage,
          showCancel: false
        })
      }
    })
  }
}

export default api