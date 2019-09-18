// package-one/pages/songs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    animated: true,
    color: '#EEEEEE',
    background: '#0E0B1F',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    songDetails:'',
    artist: [], 
    status: getApp().globalData.status
  },
  /**
   * 播放进度
   */
  sliderChange(e){

  },
  /**
   * 修改播放状态
   */
  updatePlayStatus(){
    if (this.data.status =='paused'){
      getApp().globalData.status = 'running';
      this.setData({
        status:'running'
      })
    }else{
      getApp().globalData.status = 'paused';
      this.setData({
        status: 'paused'
      })
    }
  },
  swiperChange(e){
    console.log(e)
    if (e.detail.current == 0 || e.detail.current == 2) {
      this.setData({
        background:'#6D6D6D'
      })
    } else {
      this.setData({
        background: '#0E0B1F'
      })
    }
  },
  /**
   * 获取歌曲详情信息
   */
  songDetails(id){
    getApp().wxRequest('GET', 'song/detail?ids='+id, {}, (res) => {
      this.setData({
        songDetails:res.songs
      })
      for(var i =0; i<res.songs[0].ar.length;i++){
        this.arDetails(res.songs[0].ar[i].id);
      }
    }, (err) => {

    });
  },
  /**
   * 获取歌曲作者详情信息
   */
  arDetails(id){
    var arr = [];
    getApp().wxRequest('GET', 'artist/desc?id=' + id, {}, (res) => {
      arr = this.data.artist;
      arr.push({
        briefDesc: res.briefDesc
      })
      this.setData({
        artist: arr
      })
    }, (err) => {

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.songDetails(options.id);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})