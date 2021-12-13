// pages/map/index.js
// let plugin = requirePlugin("myPlugin");
//const chooseLocation = requirePlugin('chooseLocation');

const app = getApp();
// const lat = app.globalData.lat;
// const lon = app.globalData.lon;
// const name = app.globalData.name;
// const desc = app.globalData.desc;

// const uid = app.globalData.uid;
// var appid = app.globalData.appid;
var server = app.globalData.server + "/location";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    //music_url: '',
    markers: [],
    mainInfo: {}
  },
  markertap(e) {
    wx.openLocation({
      latitude: parseFloat(this.data.mainInfo.lat),
      longitude: parseFloat(this.data.mainInfo.lon),
      scale: 18,
      name: this.data.mainInfo.name,
      address: this.data.mainInfo.address,
      success(res) {
        console.log(res)
      }
    }, )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    //创建动画
    var animation = wx.createAnimation({

      duration: 3600,
      timingFunction: "ease",
      delay: 600,
      transformOrigin: "50% 50%",

    })


    animation.scale(0.9).translate(10, 10).step(); //边旋转边放大


    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })

    var that = this
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: server,
      method: 'GET',
      data: {
        // // 'uid': uid,
        // // 'appid': appid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        wx.hideLoading();
        // wx.playBackgroundAudio({
        //   dataUrl: res.data.music,
        //   title: '',
        //   coverImgUrl: ''
        // })

        // 生成海报需要
        // wx.setStorage({
        //   key: 'main',
        //   data: res.data,
        // })

        let marker = {
          latitude:res.data.lat,
          longitude:res.data.lon,
          callout: {
            id:1,
            bgColor: '#FFCCCC',
            content:res.data.name,
            color:'#684c4b',
            display:"ALWAYS",
            fontSize: 20,
            padding:4,
            borderRadius: 4,
            borderColor:'#684c4b',
            borderWidth:2
          },
        }
        that.setData({
          mainInfo: res.data,
          //music_url: res.data.music,
          markers: [marker]
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
      title: that.data.mainInfo.shareTitle,
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
  call: function(event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone
    })
  },
})