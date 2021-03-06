import { getLocation } from "../../tencentPosition"
import { post } from "../../libs/network"
// 获取应用实例
const app = getApp()
Page({
  data: {
    showLocation: true,
    // subkey: "SS5BZ-YG23F-DHJJH-JJ4QS-SGN76-5SGIV",
    clickPointItem: {}, // 选择的点位
    isShowDetail: false, // 是否显示详情
    markers: [],
    lat:31.273391,
    lng:120.730435
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
        // console.log(res.latitude + ',' + res.longitude)
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
        // console.log(res)
      },
      fail: err => {
        // console.log(err)
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
    markArr = (markArr || []).map(v => {
      const { id, map_lat, map_lng } = v
      // console.log(map_lat, map_lng)
      v.id = Number(id)
      return {
        iconPath: 'https://pic.chuangcheng8.com/xcx/scmx_has_mi.png', //浮标图片路径，推荐png图片
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
    this.setData({lat, lng})
    this.getMarks()
  },
  onShareAppMessage: async function (e) {
    var shareObj = {
      title: '现碾大米找苏澄米香', // 默认是小程序的名称
      path: `/pages/index/index`, // 跳转路径，默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: 'https://pic.chuangcheng8.com/xcx/scmx_logo.jpg', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    }
    return shareObj
  },
})
