import { showToast } from "../../common";
import { getLocation, address2LatLng } from "../../tencentPosition"
import { post } from "../../libs/network"
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
      // { // 绘制浮标，传入JSON支持多个
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 1, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.83052, // 经度
      //   longitude: 119.97147, //纬度
      //   width: 30,
      //   height:38
      // },
      // {
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 2, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.83055, // 经度
      //   longitude: 119.97157, //纬度
      //   width: 30,
      //   height:38
      // },
      // { // 绘制浮标，传入JSON支持多个
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 3, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.83155, // 经度
      //   longitude: 119.97157, //纬度
      //   width: 30,
      //   height:38
      // },
      // {
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 4, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.83152, // 经度
      //   longitude: 119.97257, //纬度
      //   width: 30,
      //   height:38
      // },
      // {
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 5, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.831022, // 经度
      //   longitude: 119.97259, //纬度
      //   width: 30,
      //   height:38
      // },
      // {
      //   iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
      //   id: 6, // Id支持多个，方便后期点击浮标获取相关信息
      //   latitude: 31.830522, // 经度
      //   longitude: 119.97259, //纬度
      //   width: 30,
      //   height:38
      // }
    ]
  },
  mapCtx: null,
  // 点击标记点的回调
  async markertap(e) { // 这是一个事件，在wxml中绑定这个事件，点击浮标后
    // console.log(e)
    const markerId = e.markerId || e.detail.markerId
    const checkedItem = this.data.markers.find(item => item.id == markerId) || {}
    const clickPointItem = await post('/wap/machine/info', {
      machine_id: checkedItem['machine_id']
    })
    setTimeout(() => {
      this.setData({
        isShowDetail: true,
        clickPointItem
      })
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
    const { map_lat, map_lng, name, address } = this.data.clickPointItem
    wx.openLocation({ //此设置属于高级APi,可以打开微信内置地图组件
      latitude: Number(map_lat),
      longitude: Number(map_lng),
      name,
      address
    })
  },
  goPhone(){
    wx.makePhoneCall({
      phoneNumber: '18888179152' //仅为示例，并非真实的电话号码
    })
  },
  async getMarks(){
    let markArr = await post('/wap/machine/list')
    markArr = markArr.map(v => {
      const { id, map_lat, map_lng } = v
      console.log(map_lat, map_lng)
      v.id = Number(v.id)
      return {
        iconPath: 'http://r0stwq2aa.bkt.clouddn.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
        latitude: Number(map_lat), // 经度
        longitude: Number(map_lng), //纬度
        width: 30,
        height:38,
        ...v
      }
    })
    this.setData({markers:markArr})
  },
  async onLoad() {
    this.mapCtx = wx.createMapContext('myMap')
    const { lng, lat } = await getLocation()
    // console.log(lng, lat)
    // const { lat, lng } = await address2LatLng('常州化龙网络科技股份有限公司')
    this.setData({lat, lng})
    console.log(lat, lng)
    this.getMarks()
  },
})
