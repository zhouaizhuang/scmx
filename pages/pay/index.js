import { post } from "../../libs/network"
import { formatMoney } from "../../common"
import { requestPayment, goBack } from "../../api" 
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no: 100,
    noStr: '100.00',
    options: {}, // 页面参数
  },
  async selectMoney(e){
    const {no} = e.currentTarget.dataset
    this.setData({no, noStr: formatMoney(no)})
  },
  async pay(){
    const {from = '', id = ''} = this.data.options
    let order_type = 1
    if(from == 'icCard') {
      order_type = 2
    }
    const {no} = this.data
    const {appId, nonceStr, package:pack, paySign, signType, timeStamp, out_trade_no} = await post('/wap/prepaid/wxpay', { price: no, order_type, member_ic_id: id })
    try{
      const res = await requestPayment({timeStamp, nonceStr, package: pack, signType, paySign, appId})
      goBack()
    } catch(e){
      post('/wap/order/cancel', { order_no: out_trade_no })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // from ---> 标记页面来源    id标记需索充值的IC卡id
    const { from, id } = options
    if(from == 'icCard') {
      this.setData({
        no: 10,
        noStr: '10.00'
      })
    }
    console.log(options)
    this.setData({options})
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