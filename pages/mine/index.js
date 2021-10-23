import { getLocalStorage, navigateTo } from "../../api"
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
    const userInfo = getLocalStorage('userInfo') || {}
    const token = getLocalStorage('token') || ''
    this.setData({userInfo, token})
  },
  goWallet(){
    const token = getLocalStorage('token') || ''
    if(token) {
      navigateTo('../mywallet/index')
    } else {
      this.setData({isShowLogin:true})
    }
  },
  myCoupon(){
    const token = getLocalStorage('token') || ''
    if(token) {
      navigateTo('../coupon/index')
    } else {
      this.setData({isShowLogin:true})
    }
  },
  goIcCard(){
    const token = getLocalStorage('token') || ''
    if(token) {
      navigateTo('../icCard/index')
    } else {
      this.setData({isShowLogin:true})
    }
  },
  goMyOrder(){
    const token = getLocalStorage('token') || ''
    if(token) {
      navigateTo('../myOrder/index')
    } else {
      this.setData({isShowLogin:true})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton()
    const userInfo = getLocalStorage('userInfo') || {}
    const token = getLocalStorage('token') || ''
    this.setData({userInfo, token})
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