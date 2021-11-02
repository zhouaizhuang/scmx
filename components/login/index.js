import { getUserProfile, showToast, setLocalStorage, getLocalStorage } from "../../api"
import { getDateStr } from "../../common";
import { post } from "../../libs/network"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShowLogin: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    code: '', // 微信code
    isGetUserInfo: false, // 是否显示登录弹框提示
    nick_name: '',
    avatar: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeLogin(){
      this.triggerEvent('closeLogin');
    },
    getPhoneNumber(e){
      const { encryptedData, iv } =  e.detail
      const { nick_name, avatar, code } = this.data
      if(encryptedData && iv && nick_name && avatar) {
        try {
          // console.log(encryptedData, iv, code,nick_name, avatar)
          post('/wap/auth/xcxlogin', { encryptedData, iv, code, nick_name, avatar}).then(res => {
            const {amount, avatar,created_at, nick_name, openid, phone } = res
            this.closeLogin()
            setLocalStorage('userInfo', { nick_name, avatar, phone, openid, created_at, amount })
          }).catch(err => {
            setLocalStorage('userInfo', {})
            showToast(e)
          })
        } catch(e) {
          showToast(e)
        }
      }
    },
    async getUserData(e){
      const { userInfo = {} } = await getUserProfile()
      const { nickName:nick_name, avatarUrl: avatar} = userInfo || {}
      if(nick_name && avatar) {
        this.setData({ nick_name, avatar, isGetUserInfo: true })
        setLocalStorage('userInfo', { nick_name, avatar})
      }
    },
  },
  created(){
    const token = getLocalStorage('token') || ''
    const tokenDate = getLocalStorage('tokenDate') || 0
    const toDay = getDateStr()
    if(!token || Number(toDay) - Number(tokenDate) > 4) {
      wx.login({
        success: res => {
          this.setData({code: res.code})
        },
        fail: err => {
          showToast('获取微信code失败' + err)
        }
      })
    }
  }
})
