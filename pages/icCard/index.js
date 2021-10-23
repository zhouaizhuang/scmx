import { post } from "../../libs/network"

// pages/icCard/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList:[],
    isGetData:false,
  },
  async getIcCard(){
    let cardList = await post('/wap/ic/list')
    cardList = cardList.map(v => {
      return {
        ...v,
        _price: Number(v.price)
      }
    })
    this.setData({cardList, isGetData:true})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIcCard()
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