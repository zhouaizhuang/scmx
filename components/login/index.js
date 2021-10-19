import { getUserProfile, showToast, setLocalStorage } from "../../api"
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
    isGetUserInfo: false, // 是否显示登录弹框提示
    nick_name: '',
    avatar: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber(e){
      const { encryptedData, iv } =  e.detail
      const { nick_name, avatar } = this.data
      if(String(encryptedData) && String(iv) && nick_name && avatar) {
        wx.login({
          success: async res => {
            const { code } = res
            try {
              post('/wap/auth/xcxlogin', { encryptedData, iv, code,nick_name, avatar}).then(res => {
                const {amount, avatar,created_at, nick_name, openid, phone } = res
                this.setData({isShowLogin: !phone})
                setLocalStorage('userInfo', { nick_name, avatar, phone, openid, created_at, amount })
              }).catch(err => {
                setLocalStorage('userInfo', {})
                console.log(err)
              })
            } catch(e) {
              showToast(JSON.stringify(e))
            }
          },
          fail: res => showToast(res)
        }) 
      }
    },
    async getUserData(e){
      const { userInfo = {} } = await getUserProfile()
      const { nickName:nick_name, avatarUrl: avatar} = userInfo || {}
      if(nick_name && avatar) {
        this.setData({ nick_name, avatar, isGetUserInfo: true })
      }
    },
  }
})
