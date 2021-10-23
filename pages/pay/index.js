import { post } from "../../libs/network"
import { formatMoney } from "../../common"
import { requestPayment, navigateTo } from "../../api" 
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no: 300,
    noStr: '300.00',
  },
  async selectMoney(e){
    const {no} = e.currentTarget.dataset
    this.setData({no, noStr: formatMoney(no)})
  },
  async pay(){
    const {no} = this.data
    const {appId, nonceStr, package:pack, paySign, signType, timeStamp, out_trade_no} = await post('/wap/prepaid/wxpay', { price: no })
    try{
      const res = await requestPayment({timeStamp, nonceStr, package: pack, signType, paySign, appId})
      navigateTo('../mywallet/index')
    } catch(e){
      post('/wap/order/cancel', { order_no: out_trade_no })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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