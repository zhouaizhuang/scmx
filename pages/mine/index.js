import { navigateTo } from "../../api"
import { get } from "../../libs/network"
// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLogin: false, // 是否显示登录提示
  },
  showLogin(){
    this.setData({isShowLogin:true})
  },
  closeLogin(){
    this.setData({isShowLogin:false})
  },
  goWallet(){
    navigateTo('../mywallet/index')
  },
  myCoupon(){
    navigateTo('../coupon/index')
  },
  goIcCard(){
    navigateTo('../icCard/index')
  },
  goMyOrder(){
    navigateTo('../myOrder/index')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})