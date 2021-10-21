import { post } from "../../libs/network"
import { navigateTo, showToast, requestPayment, getLocalStorage } from "../../api"

// pages/payDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}, // 页面参数
    isShowStatusMask: false, // 是否显示付款状态弹窗
    paySuccess: 0, // 0：未付款 1：付款成功  2：付款失败
    payType: 1, // 1:微信支付   3钱包支付   4 IC卡支付
  },
  showLogin(){
    this.setData({isShowLogin:true})
  },
  closeLogin(){
    this.setData({isShowLogin:false})
    const userInfo = getLocalStorage('userInfo') || {}
    const token = getLocalStorage('token') || ''
    this.setData({userInfo, token})
    this.getDetail()
  },
  payWechat(){
    this.setData({payType: 1})
  },
  payWallet(){
    this.setData({payType: 3})
  },
  payIcCard(){
    this.setData({payType: 4})
  },
  goCoupon(){
    navigateTo('../coupon/index')
  },
  async pay(){
    const token = getLocalStorage('token') || ''
    if(!token) { return this.showLogin() }
    const { rice_amount, machine_id } = this.data.options
    const {appId, nonceStr, package:pack, paySign, signType, timeStamp } = await post('/wap/order/pay', {rice_amount, machine_id, member_coupon_id: '', pay_type: 1, member_ic_id:''})
    try{
      const res = await requestPayment({timeStamp, nonceStr, package: pack, signType, paySign, appId})
      this.setData({paySuccess:1, isShowStatusMask: true})
    } catch(e){
      this.setData({paySuccess:2, isShowStatusMask: true})
      showToast(JSON.stringify(e))
    } 
  },
  closeMask(){
    this.setData({isShowStatusMask: false})
  },
  goPayList(){
    navigateTo('../myOrder/index')
  },
  async getDetail(){
    try{
      const {rice_amount, machine_id} = this.data.options
      let info = await post('/wap/order/info', {rice_amount, machine_id})
      info._phone = info.phone.slice(0, 3) + '****' + info.phone.slice(-4) 
      this.setData({ info })
    } catch(e) {
      showToast(e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { rice_amount, machine_id } = options
    this.setData({options})
    this.getDetail()
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