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
      header: {
        'Host': 'music.163.com',
        'Origin': 'http://music.163.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer':'http://music.163.com/search/',
        // 'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        // 'Accept': 'application/json'
      },
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
    // this.globalData.statusBarHeight = (res.statusBarHeight + 55) * 2;//无头部导航栏时
    this.globalData.statusBarHeight = res.statusBarHeight * 2; //有头部导航栏时
  },
  globalData: {
    api: 'https://musicapi.leanapp.cn/',
    // api: 'https://music.163.com/',
    // api:'http://p4.music.126.net',
    userInfo: null,
    statusBarHeight: 0,
    play:{
      status: 'paused'//暂停：paused；播放：running
    }
  }
})