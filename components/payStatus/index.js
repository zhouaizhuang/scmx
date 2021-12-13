// components/index.js
import { navigateTo } from "../../api"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    payStatus: { // 0：未付款 1：付款成功  2：付款失败
      type: Number,
      value: 0,
    },
    isShowStatusMask:{ // 是否显示支付状态
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPayList(){
      navigateTo('../../pages/myOrder/index')
    },
    close(){
      this.triggerEvent('closeMask');
    },
  }
})
