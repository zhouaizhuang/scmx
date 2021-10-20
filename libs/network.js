import { getLocalStorage, setLocalStorage, showToast } from "../api"
import { JSON2url, formatJSON } from "../common"
const BaseHost = 'https://dami.chuangcheng8.com' // 基础域名
// get请求
export const get = function (url, params = {}){
  return request(url, {
    data: params,
    method: 'GET'
  }).then(res => res.data).catch(e => console.log(JSON.stringify(e)))
}
// post请求
export const post = function (url, params = {}){
  return request(url, {
    data: params,
    method: 'POST'
  }).then(res => res.data).catch(e => console.log(JSON.stringify(e)))
}
// 请求接口
export const request = async function (url, options = {}) {
  const data = formatJSON(options.data) // 拿到传入的数据
  const localToken = getLocalStorage('token') || '' // 本地的token
  delete options.data
  let newOptions = {
    method: 'GET',
    header: {
      "Content-Type": "Content-type:json;charset=utf-8",
      "Authorization": localToken
    }, // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
    ...options
  }
  if(newOptions.method === 'GET') {
    url = JSON2url(url, data)
  } else if(newOptions.method === 'POST') {
    newOptions.data = data
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: BaseHost + url,
      ...newOptions,
      success: res => {
        const { code, message = '', token = '' } = res.data || {}
        if(code === 200) {
          if(token && (token !== localToken)) {
            setLocalStorage('token', token)
          }
          resolve(res.data)
        } else if(code === 401){ // token验证失败 || token 过期
          setLocalStorage('token', '')
        } else {
          return showToast(message)
        }
      },
      fail: err => reject(err),
      complete: () => {}
    })
  })
}