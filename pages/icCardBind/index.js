// pages/icCardBind/index.js
import { navigateTo, showToast, getLocalStorage } from "../../api"
import {post} from "../../libs/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_no:'', // ic卡号
    isShowLogin: false, // 是否展示登录组件
  },
  // 关闭授权弹框的时候及时将新数据获取
  closeLogin(){
    this.setData({isShowLogin:false})
  },
  changeCardNo(e){
    this.setData({cardNo: e.detail.value})
  },
  async bindIcCard(){
    const token = getLocalStorage('token') || ''
    if(!token) { 
      return this.setData({isShowLogin:true})
    }
    try{
      const res = await post('/wap/ic/create', {
        card_no: this.data.card_no
      })
      if(res) {
        navigateTo('../icCard/index')
      }
    } catch(e) {
      showToast(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { card_no } = options
    this.setData({card_no})
    const token = getLocalStorage('token') || ''
    if(!token) { 
      this.setData({isShowLogin:true})
    }
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