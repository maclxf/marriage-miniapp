// pages/invitation/index.js
const app = getApp()
var server = app.globalData.server + "/main";
//var appid = app.globalData.appid;
//const uid = app.globalData.uid;
var touchDot = 0; //触摸时的原点
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ""; // 记录/清理时间记录
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    music_url: '',
    isPlayingMusic: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var that = this
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: server,
      method: 'GET',
      data: {
        // 'uid': uid,
        // 'appid': appid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        wx.hideLoading();
        wx.playBackgroundAudio({
          dataUrl: res.data.music,
          title: '',
          coverImgUrl: ''
        })

        // 生成海报需要
        wx.setStorage({
          key: 'main',
          data: res.data,
        })

        that.setData({
          mainInfo: res.data,
          music_url: res.data.music
        });
      }
    })
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
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  callhe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  },
  play: function(event) {
    console.log(event)
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: '',
        success: function(e) {
          console.log(e)
        }
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
})