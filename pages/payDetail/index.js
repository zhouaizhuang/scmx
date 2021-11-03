import { post } from "../../libs/network"
import { showToast, requestPayment, getLocalStorage } from "../../api"
import { safeGet, range, round } from "../../common"

// pages/payDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}, // 页面参数
    info:{}, // 支付详情数据
    showTotal: 0, // 用于展示的使用优惠券之后的需要付款的总金额
    isShowStatusMask: false, // 是否显示付款状态弹窗
    payStatus: 0, // 0：未付款 1：付款成功  2：付款失败
    payType: 1, // 1:微信支付   3钱包支付   4 IC卡支付
    isShowCoupon:false, // 默认不显示优惠券选择列表
    couponNotUsed: [], // 未使用的优惠券,
    checkedCoupon: {coupon:{}}, // 选择的优惠券
    isShowIc:false, // 是否显示ic卡列表 
    icCardList: [], // ic卡列表
    selectIcItem: {}, // 被选中的ic卡条目
  },
  showLogin(){
    this.setData({isShowLogin:true})
  },
  // 关闭授权弹框的时候及时将新数据获取
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
    this.setData({payType: 4, isShowIc:true})
  },
  openCoupon(){
    this.setData({isShowCoupon: true})
    this.getCoupon()
  },
  closeIcCard(){
    this.setData({isShowIc:false})
  },
  selectIcCard(e){
    const { item } = e.currentTarget.dataset
    console.log(e.currentTarget)
    const icCardList = this.data.icCardList.map(v => {
      v.isChecked = v.id === item.id
      return v
    })
    this.setData({icCardList, selectIcItem:item})
  },
  empty(){},
  closeCoupon(){
    this.setData({isShowCoupon: false})
  },
  async pay(){
    const token = getLocalStorage('token') || ''
    if(!token) { 
      return setTimeout(() => {
        this.showLogin() 
      }, 1000)
    }
    const { rice_amount, machine_id } = this.data.options
    const { payType, selectIcItem } = this.data
    const {id} = this.data.checkedCoupon
    // 1:微信支付   3钱包支付   4 IC卡支付
    if(payType == 1) {
      const {appId, nonceStr, package:pack, paySign, signType, timeStamp, out_trade_no } = await post('/wap/order/pay', {rice_amount, machine_id, member_coupon_id: id, pay_type: payType, member_ic_id: selectIcItem.id})
      try{
        const res = await requestPayment({timeStamp, nonceStr, package: pack, signType, paySign, appId})
        console.log(res)
        this.setData({payStatus:1, isShowStatusMask: true})
      } catch(e){
        post('/wap/order/cancel', { order_no: out_trade_no })
        this.setData({payStatus:2, isShowStatusMask: true})
      }
    } else {
      const res = await post('/wap/order/pay', {rice_amount, machine_id, member_coupon_id: id, pay_type: payType, member_ic_id: selectIcItem.id})
      if(res) {
        this.setData({payStatus:1, isShowStatusMask: true})
      } else {
        this.setData({payStatus:2, isShowStatusMask: true})
      }
    }
  },
  closeMask(){
    this.setData({isShowStatusMask: false})
  },
  nouUseCoupon(){
    const couponNotUsed = this.data.couponNotUsed.map(item => {
      item.isChecked = false
      return item
    })
    this.setData({couponNotUsed, checkedCoupon: {}})
    this.closeCoupon()
  },
  selectCoupon(e){
    const {item} = e.currentTarget.dataset
    const {id} = item
    const couponNotUsed = this.data.couponNotUsed.map(item => {
      if(item.id == id) {
        item.isChecked = true
        const total_price = safeGet(() => this.data.info.total_price, 0) - Number(safeGet(() => item.coupon.amount,0))
        const showTotal = range(round(total_price, 2), 0)
        // console.log(showTotal)
        this.setData({checkedCoupon:item, showTotal})
      } else {
        item.isChecked = false
      }
      return item
    })
    this.setData({couponNotUsed})
  },
  // 获取优惠券
  async getCoupon(){
    const {rice_amount} = this.data.options
    let list = await post('/wap/coupon/valid?expand=coupon', { price: rice_amount })
    list = list.map(v => ({...v, isChecked: false, _perLimit: Number(v.coupon.perLimit)}))
    this.setData({ couponNotUsed: list })
  },
  async getIcCardList(){
    let icCardList = await post('/wap/ic/list')
    icCardList = icCardList.map(v => {
      return {
        ...v,
        _price: Number(v.price),
        isChecked:false
      }
    })
    this.setData({icCardList})
  },
  async getDetail(){
    try{
      const {rice_amount, machine_id} = this.data.options
      let info = await post('/wap/order/info', {rice_amount, machine_id})
      info._phone = info.phone.slice(0, 3) + '****' + info.phone.slice(-4) 
      this.setData({ info, showTotal:info.total_price })
      this.getCoupon()
      this.getIcCardList()
    } catch(e) {
      showToast(e)
    }
  },
  empty(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { rice_amount, machine_id } = options
    this.setData({options})
    const token = getLocalStorage('token') || ''
    if(!token) { return this.showLogin() }
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