// components/tabbar.js
import { redirectTo } from "../../api"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    selectTab: {
      type: String,
      value: 'index',
    },
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
    goIndex(){
      if(this.data.selectTab !== 'index') {
        redirectTo('/pages/index/index')
      }
    },
    goQrcode(){
      // if(this.data.selectTab !== 'qrcode') {
      //   redirectTo('/pages/qrcode/index')
      // }
    },
    goMine(){
      if(this.data.selectTab !== 'mine') {
        redirectTo('/pages/mine/index')
      }
    }
  }
})
