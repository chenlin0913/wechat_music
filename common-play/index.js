// common-play/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isPlay: true,
    animationData:null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hidePlay() {
      this.hideModal();
    },
    showPlay() {
      this.chooseSezi();
    },
    setIsPlay(event) {
      String.prototype.bool = function() {
        return (/^true$/i).test(this);
      };
      this.setData({
        isPlay: event.target.dataset.flag.bool()
      })
    },
    // 动画函数
    chooseSezi: function(e) {
      // 用that取代this，防止不必要的情况发生
      var that = this;
      // 创建一个动画实例
      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 400,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        isShow: true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
      setTimeout(function() {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 100)
    },
    // 隐藏
    hideModal: function(e) {
      var that = this;
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.translateY(500).step()
      that.setData({
        animationData: animation.export()
      })
      setTimeout(function() {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          isShow: false
        })
      }, 500)
    }
  }
})