// pages/index/index.js
const app = getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      console.log(this)
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    tabbarList: getApp().globalData.tabbarList,
    statusBarHeight: getApp().globalData.statusBarHeight,
    imgUrls: [],
    hotList:[],
    recList:[],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current: 0
  },
  methods: {
    recAll() {
      this.common_play.showPlay();
    },
    hotAll(){
      this.common_play.hidePlay();
    },
    swiperChange(e) {

    },
    /**
     * 获取推荐歌单
     */
    getRecSong(){
      getApp().wxRequest('GET', 'personalized?limit=6', {}, (res) => {
        this.setData({
          recList: res.result
        })
      }, (err) => {

      });
    },
    /**
     * 获取热门歌曲排行
     */
    getHotSong(){
      getApp().wxRequest('GET', 'top/list?idx=1', {}, (res) => {
        //只取5条数据
        var arrs = [];
        for(var i =0; i <= 4; i++){
          arrs.push(res.playlist.tracks[i])
        }
        this.setData({
          hotList: arrs
        })
      }, (err) => {

      });
    },
    /**
     * 获取首页banner
     */
    getIndexBanner(){
      getApp().wxRequest('GET', 'banner?type=2', {}, (res) => {
        this.setData({
          imgUrls: res.banners
        })
      }, (err) => {

      });
    },
    tabChange(e) {

      wx.switchTab({
        url: e.detail.item.pagePath
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options)
      //获得common-play组件
      this.common_play = this.selectComponent("#common-play");
      this.getIndexBanner();
      this.getHotSong();
      this.getRecSong();
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
      this.setData({
        dialogShow: true
      })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
      this.setData({
        current: 0
      })
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
  }
})