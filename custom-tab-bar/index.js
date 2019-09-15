Component({
  data: {
    selected: 0,
    color: "#4E4F52",
    selectedColor: "#EF01A0",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/image/icon_home.png",
        selectedIconPath: "/image/icon_home_hl.png",
        text: "Home"
      },
      {
        pagePath: "/pages/explore/explore",
        iconPath: "/image/icon_explore.png",
        selectedIconPath: "/image/icon_explore_hl.png",
        text: "Explore"
      },
      {
        pagePath: "/pages/radio/radio",
        iconPath: "/image/icon_radio.png",
        selectedIconPath: "/image/icon_radio_hl.png",
        text: "Radio"
      },
      {
        pagePath: "/pages/account/account",
        iconPath: "/image/icon_account.png",
        selectedIconPath: "/image/icon_account_hl.png",
        text: "Account"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})