/* 小程序公用js代码 */
// 获取微信信息
export const getUserProfile = function () {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: 'zh_CN',
      success: res => resolve(res.userInfo),
      fail: err => reject(err)
    })
  })
}
// 显示loading
export const showLoading = function (title = '加载中', duration = 0, mask = true) {
  wx.showLoading({ title, mask})
  if(duration) {
    hideLoading(duration)
  }
}
// 关闭loading
export const hideLoading = function (time = 0) {
  setTimeout(() => { wx.hideLoading() }, time)
}
// 显示提示弹框
export const showToast = (title, delay = 0, duration = 3000, icon='none') => {
  if(title) {
    setTimeout(() => {
      wx.showToast({ title: String(title), icon, duration})
      setTimeout(() => wx.hideToast(),duration)
    }, delay)
  }
}
// 模态框封装
export const showModal = (title = '标题', content = '这是一个模态弹窗') => {
  if(title) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        success (res) {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject('用户点击了取消')
          }
        },
        fail: err => reject(err)
      })
    })
  }
}
// 页面跳转(可返回上一个页面)
export const navigateTo = function (url = '', time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 返回页面栈前面N页, 延时time毫秒执行, 返回promise对象
export const navigateBack = function (delta = 1, time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateBack({
        delta,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面（不可返回）
export const switchTab = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.switchTab({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 关闭当前页面，跳转到应用内的某个页面（不可返回, 不可以跳转到tabbar页面）
export const redirectTo = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.redirectTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 关闭当前页面，跳转到应用内的某个页面（不可返回, 不可以跳转到tabbar页面）
export const reLaunch = function (url = '', time = 0){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.reLaunch({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 跳转小程序
export const navigateToMiniProgram = function (params = {}){
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId: '', // 要打开的小程序 appId
      path: 'pages/index/index', // 打开的页面路径，如果为空则打开首页
      extraData: '', // 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      envVersion: 'develop', // trial | release 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      shortLink: '', // 小程序链接，当传递该参数后，可以不传 appId 和 path。链接可以通过【小程序菜单】->【复制链接】获取。
      ...params,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 跳转之后，返回原小程序
export const navigateBackMiniProgram = function (extraData = {}){
  return new Promise((resolve, reject) => {
    wx.navigateBackMiniProgram({
      extraData, //  举例：{foo: 'bar'}
      success: res=> resolve(res),
      fail: err => reject(err)
    })
  })
}
export const exitMiniProgram = function (){
  return new Promise((resolve, reject) => {
    wx.exitMiniProgram({
      success: res=> resolve(res),
      fail: err => reject(err)
    })
  })
}
// 设置当前页面的标题
export const setPageTitle = function (title = '') {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 设置当前导航条风格
export const setNavigationBarColor = function (frontColor,backgroundColor, animation = {} ) {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarColor({
      frontColor, // 文字颜色
      backgroundColor, // 导航条背景
      animation, // 动画时间、动画函数。举例子： {  duration: 400, timingFunc: 'easeIn'}
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
// 滚动到页面什么位置
export const pageScrollTo = function (scrollTop, duration) {
  wx.pageScrollTo({
    scrollTop, // 滚动到什么位置： 0代表页面顶部
    duration // 滚动执行耗时多少ms
  })
}
// 获取用户当前的权限有哪些
// 返回结果，事例：{scope.address: true, scope.invoice: true, scope.invoiceTitle: true ,scope.userInfo: true}
export const getSetting = function (){
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => resolve(res.authSetting),
      fail: err => reject(err)
    })
  })
}
// 检查更新
// 使用方法: 在app.js的onlaunch中直接调用这个方法
export const checkUpdateVersion = function () {
  if (wx.canIUse('getUpdateManager')) { //判断微信版本是否 兼容小程序更新机制API的使用
    const updateManager = wx.getUpdateManager() //创建 UpdateManager 实例
    updateManager.onCheckForUpdate(function(res) { //检测版本更新
      if (res.hasUpdate) { // 请求完新版本信息的回调
        updateManager.onUpdateReady(function() { //监听小程序有版本更新事件
          wx.showModal({ //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: res => { if (res.confirm) { updateManager.applyUpdate() } } // 调用 applyUpdate 应用新版本并重启
          })
        })
        updateManager.onUpdateFailed(function() {
          wx.showModal({ // 新版本下载失败
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          })
        })
      }
    })
  } else {
    wx.showModal({ //TODO 此时微信版本太低（一般而言版本都是支持的）
      title: '溫馨提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}
// 设置localstorage
export const setLocalStorage = function (key = '', val = ''){
  wx.setStorageSync(key, val)
}
// 查看localstorage
export const getLocalStorage = function (key = ''){
  wx.getStorageSync(key)
}
// 清除localStorage
export const clearLocalStorage = function (){
  wx.clearStorageSync()
}