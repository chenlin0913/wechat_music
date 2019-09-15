// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgFlag:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    bannerList: [{
      zh: '音乐，是人生最大的快乐；音乐，是生活中的一股清流；首先，是陶冶性情的熔炉。——冼星海',
      en: 'Music is the greatest happiness in life; music is a clear stream in life; first, it is the melting pot of temperament.'
    }, {
      zh: '音乐表达的是无法用语言描述，却又不可能对其保持沉默的东西。——维克多·雨果',
      en: 'Music expresses things that cannot be described in words, but cannot be silenced.'
    }, {
      zh: '音乐不只是表达的艺术，它还是能引起激动的艺术。——（法）费提斯',
      en: 'Music is not just the art of expression, it is still an art that can cause excitement.'
    }, {
      zh: '音乐歌颂人们的生活，引导人们走向光明的未来。——（苏）普罗科菲耶夫',
      en: `Music sings people's lives and leads people to a bright future.`
    }]
  },
  /**
   * 获取权限状态
   */
  watch:{
    hasUserInfo:function(i,v){
      console.log(i,v)
      if(i){
        
      }
    }
  },
  getStarted:function(){
    console.log(123)
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setWatcher(this);
    if (app.globalData.userInfo) {
      console.log(1)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      console.log(2)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log(3)
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})