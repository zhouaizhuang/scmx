import { showToast } from "../../common";
import { getLocation, address2LatLng } from "../../tencentPosition"
let plugin = requirePlugin('routePlan');
const { QQMAP_KEY } = require('../../config/index')
// 获取应用实例
const app = getApp()

Page({
  data: {
    showLocation: true,
    // subkey: "SS5BZ-YG23F-DHJJH-JJ4QS-SGN76-5SGIV",
    clickPointItem: {}, // 选择的点位
    isShowDetail: false, // 是否显示详情
    markers: [
      { // 绘制浮标，传入JSON支持多个
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 1, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.83052, // 经度
        longitude: 119.97147, //纬度
        width: 30,
        height:38
      },
      {
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 2, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.83055, // 经度
        longitude: 119.97157, //纬度
        width: 30,
        height:38
      },
      { // 绘制浮标，传入JSON支持多个
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 3, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.83155, // 经度
        longitude: 119.97157, //纬度
        width: 30,
        height:38
      },
      {
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 4, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.83152, // 经度
        longitude: 119.97257, //纬度
        width: 30,
        height:38
      },
      {
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 5, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.831022, // 经度
        longitude: 119.97259, //纬度
        width: 30,
        height:38
      },
      {
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        id: 6, // Id支持多个，方便后期点击浮标获取相关信息
        latitude: 31.830522, // 经度
        longitude: 119.97259, //纬度
        width: 30,
        height:38
      }
    ]
  },
  mapCtx: null,
  // 点击标记点的回调
  markertap(e) { // 这是一个事件，在wxml中绑定这个事件，点击浮标后
    // console.log(e)
    const markerId = e.markerId || e.detail.markerId
    console.log(markerId)
    setTimeout(() => {
      this.setData({ isShowDetail: true, clickPointItem: {id: markerId, longitude: 119.97257, latitude: 31.83155, name: '常州市市政府1号', address:'详细地址128-1'} })
    }, 200)
    // const checkedPoint = markers.find(item => item.id == markerId)
    // 根据id调借口查出详情数据
  },
  // 用户移动地图的监听回调
  regionDidChange(e) {
    this.mapCtx.getCenterLocation({
      success: function(res){
        // console.log(res)
        console.log(res.latitude + ',' + res.longitude)
      }
    })
  },
  // 回到用户当前定位所在位置
  moveToLocation(){
    const {lng, lat} = this.data
    this.mapCtx.moveToLocation({
      longitude:lng,
      latitude: lat,
      success: res => {
        console.lof(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 点击地图空白处
  tapBlank(){
    this.setData({ isShowDetail: false })
  },
  // 开始导航
  openLocation(){
    const {longitude, latitude, name,address} = this.data.clickPointItem
    console.log(longitude, latitude)
    wx.openLocation({ //此设置属于高级APi,可以打开微信内置地图组件
      latitude,
      longitude,
      name,
      address
    })
  },
  async onLoad() {
    this.mapCtx = wx.createMapContext('myMap')
    const { lng, lat } = await getLocation()
    // console.log(lng, lat)
    // const { lat, lng } = await address2LatLng('常州化龙网络科技股份有限公司')
    this.setData({lat, lng})
    console.log(lat, lng)
  },
  async goMap(){
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       address: '常州化龙网络科技股份有限公司',
    //       scale: 18
    //     })
    //   }
    // })
    // const { lat, lng } = await address2LatLng('常州化龙网络科技股份有限公司')
    // wx.openLocation({
    //   latitude: 31.812061 ,
    //   longitude: 119.994034,
    //   // address: '常州化龙网络科技股份有限公司',
    //   scale: 18
    // })
    let referer = '一潞有你'; //调用插件的app的名称
    let endPoint = JSON.stringify({ //终点
      'name': '吉野家(北京西站北口店)',
      'latitude': 39.89631551,
      'longitude': 116.323459711
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + QQMAP_KEY + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  goPhone(){
    wx.makePhoneCall({
      phoneNumber: '18888179152' //仅为示例，并非真实的电话号码
    })
  }
})
