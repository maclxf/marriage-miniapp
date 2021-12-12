// app.js
App({
  onLaunch: function() {
    //var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      // wx.login({
      //     success: function () {
      //         wx.getUserInfo({
      //             success: function (res) {
      //                 //console.info(res);
      //                 that.globalData.userInfo = res.userInfo;
      //                 typeof cb == "function" && cb(that.globalData.userInfo)
      //             }
      //         })
      //     }
      // });
    }

  },
  onHide: function() {
    wx.pauseBackgroundAudio();
  },
  onShow: function() {
    wx.playBackgroundAudio()
  },
  globalData: {
    userInfo: null,
    // 下面填写酒店相关信息
    lat: '29.533909',
    lon: '106.514002',
    name: '俏巴渝',
    desc: '重庆市渝中区龙湖时代天街D馆L4',

    uid: 1,
    //server: 'http://ci-wechat.top/invite',
    server: 'https://maclxf.top/invite',
    music_url: ''
  }
});