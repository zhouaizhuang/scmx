// app.js
import { checkUpdateVersion } from "./api.js"
App({
  onLaunch() {
    checkUpdateVersion()
  },
  globalData: {
    userInfo: null
  }
})
