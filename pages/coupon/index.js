// pages/coupon/index.js
import { post } from "../../libs/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '0',
    currentTabClass:'l18',
    couponNotUsed: {
      list: [],
      page: 1,
      isEnd: false,
      isLoad: false,
    },
    couponUsed:{
      list: [],
      page: 1,
      isEnd: false,
      isLoad: false,
    },
    couponOverTime: {
      list: [],
      page: 1,
      isEnd: false,
      isLoad: false,
    },
    page:1, // 默认当前加载的页面 
  },
  selectTab(e) {
    const { index } = e.currentTarget.dataset
    const mapClass= ['l18', 'l48', 'l78']
    this.setData({currentTab: index, currentTabClass:mapClass[index]})
  },
  async getNotUsed(){
    let { list } = await post(`/wap/coupon/list?expand=coupon&page=${this.data.couponNotUsed.page}`, { status: 1 })
    list = list.map(v => ({...v, isChecked: false, _perLimit: Number(v.coupon.perLimit)}))
    const newList = [...this.data.couponNotUsed.list, ...list]
    const newCouponNotUsed = {
      ...this.data.couponNotUsed,
      list: newList,
      isLoad: true,
      isEnd: !list.length
    }
    this.setData({ couponNotUsed: newCouponNotUsed })
  },
  async getUsed(){
    let { list } = await post(`/wap/coupon/list?expand=coupon&page=${this.data.couponUsed.page}`, { status: 2 })
    list = list.map(v => ({...v, isChecked: false, _perLimit: Number(v.coupon.perLimit)}))
    const newList = [...this.data.couponUsed.list, ...list]
    const newCouponUsed = {
      ...this.data.couponUsed,
      list: newList,
      isLoad: true,
      isEnd: !list.length
    }
    this.setData({ couponUsed: newCouponUsed })
  },
  async getOverTime(){
    let { list } = await post(`/wap/coupon/list?expand=coupon&page=${this.data.couponOverTime.page}`, { status: 3 })
    list = list.map(v => ({...v, isChecked: false, _perLimit: Number(v.coupon.perLimit)}))
    const newList = [...this.data.couponOverTime.list, ...list]
    const newCouponOverTime = {
      ...this.data.couponOverTime,
      list: newList,
      isLoad: true,
      isEnd: !list.length
    }
    this.setData({ couponOverTime:newCouponOverTime })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotUsed()
    this.getUsed()
    this.getOverTime()
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
    const { currentTab } = this.data
    if(currentTab == '0') {
      const { page } = this.data.couponNotUsed
      this.setData({['couponNotUsed.page']: page + 1})
      this.getNotUsed()
    } else if(currentTab == '1'){
      const { page } = this.data.couponUsed
      this.setData({['couponUsed.page']: page + 1})
      this.getUsed()
    } else {
      const { page } = this.data.couponOverTime
      this.setData({['couponOverTime.page']: page + 1})
      this.getOverTime()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})