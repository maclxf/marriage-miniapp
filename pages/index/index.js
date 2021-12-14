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
    shareTitle: '邀请函',
    thumb: '',
    timeLineThumb:'',
    cover:[],
    music_url: '',
    music_title: '',
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
          dataUrl: res.data.music.url,
          title: res.data.music.title,
          coverImgUrl: ''
        })

        // 生成海报需要
        // wx.setStorage({
        //   key: 'main',
        //   data: res.data,
        // })

        that.setData({
          shareTitle: res.data.shareTitle,
          thumb: res.data.thumb,
          timeLineThumb: res.data.timeLineThumb,
          cover: res.data.cover,
          music_url: res.data.music.url,
          music_title: res.data.music.title,
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
      title: that.data.shareTitle,
      imageUrl: that.data.thumb,
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
  onShareTimeline: function() {
    return {
      title: this.data.shareTitle,
      imageUrl: this.data.timeLineThumb,
    }
  },
  play: function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: this.data.music_title,
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
  goMap: function() {
    wx.switchTab({
      url: '/pages/map/index',
    });

  }
})