//app.js
const watch = require("./utils/watch.js");
App({
  setWatcher(page) {
    watch(page);
  },
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: this.globalData.api+url,
      method: method,
      data: data,
      // header: {
      //   'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
      //   'Accept': 'application/json'
      // },
      // dataType: 'json',
      success: function(res) {
        callback(res.data);
      },
      fail: function(err) {
        errFun(res);
      }
    })
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var res = wx.getSystemInfoSync();
    console.log(res)
    // this.globalData.statusBarHeight = (res.statusBarHeight + 55) * 2;//无头部导航栏时
    this.globalData.statusBarHeight = res.statusBarHeight * 2; //有头部导航栏时
    console.log(this.globalData.statusBarHeight)
  },
  globalData: {
    api: 'http://musicapi.leanapp.cn/',
    userInfo: null,
    statusBarHeight: 0,
    tabbarList: [{
        "pagePath": "/pages/index/index",
        "iconPath": "../../image/icon_home.png",
        "selectedIconPath": "../../image/icon_home_hl.png",
        "text": "Home"
      },
      {
        "pagePath": "/pages/explore/explore",
        "iconPath": "../../image/icon_explore.png",
        "selectedIconPath": "../../image/icon_explore_hl.png",
        "text": "Explore"
      },
      {
        "pagePath": "/pages/radio/radio",
        "iconPath": "../../image/icon_radio.png",
        "selectedIconPath": "../../image/icon_radio_hl.png",
        "text": "Radio"
      },
      {
        "pagePath": "/pages/account/account",
        "iconPath": "../../image/icon_account.png",
        "selectedIconPath": "../../image/icon_account_hl.png",
        "text": "Account"
      }
    ],
  }
})