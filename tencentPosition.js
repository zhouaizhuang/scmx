// 引入腾讯SDK核心类
const QQMapWX = require('./libs/qqmap-wx-jssdk.min.js')
const { QQMAP_KEY } = require('./config/index')
// 实例化腾讯地图API核心类
const txMap = new QQMapWX({ key: QQMAP_KEY })

// 获取经纬度
export const getLocation = function (params = {}) {
  // wxLog.info('开始调用定位gcj02获取经纬度...')
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      // altitude: false,
      // highAccuracyExpireTime: 0,
      // isHighAccuracy: true,
      ...params,
      success: ({ longitude: lng, latitude: lat }) => {
        resolve({ lng, lat })
      },
      fail: err => {
        // wx.vibrateLong({})
        // showToast('定位获取不成功，请重试')
        // wxLog.error(`未拿到坐标，停止执行...错误信息:${JSON.stringify(err)}`)
        reject(err)
      },
      complete: () => {}
    })
  })
}
// 根据经纬度的转地址的promise对象
export const convertLocationToAdress = function ({ lng, lat }) {
  return new Promise((resolve, reject) => {
    txMap.reverseGeocoder({
      location: {
        longitude: lng,
        latitude: lat
      },
      success: res => {
        const address = (res.result && res.result.address) || ''
        if (res.status === 0) {
          console.log(`腾讯地图解析获取地址信息: ${address}`)
        } else {
          console.log(`腾讯地图地址解析出错, ${JSON.stringify(res)}`)
        }
        resolve(address)
      },
      fail: function (err) {
        console.log(`腾讯地图解析地址出错, ${JSON.stringify(err)}`)
        reject(err)
      }
    })
  })
}

export const address2LatLng = function (address) {
  //调用地址解析接口
  return new Promise((resolve, reject) => {
    txMap.geocoder({
      //获取表单传入地址
      address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: res => {//成功后的回调
        const { lat, lng } = res.result.location
        resolve({lat, lng})
      },
      fail: err => {
        reject(err)
      }
    })
  })
}