import { navigateTo } from "../../api"
import { get, post } from "../../libs/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    orderList: [],
    isGetData: false,
    page: 1,
  },
  goPay(){
    navigateTo('../pay/index')
  },
  async getOrderList(){
    const {list} = await post(`/wap/order/list?type=1&page=${this.data.page}`)
    const newOrderList = [...this.data.orderList, ...list]
    this.setData({orderList: newOrderList, isGetData:true})
  },
  async getMyInfo(){
    const userInfo = await get('/wap/auth/my')
    this.setData({userInfo})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
    this.getMyInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { page } = this.data
    this.setData({page: page + 1})
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})