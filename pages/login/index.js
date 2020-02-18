const app = getApp();
var md5 = require('../../utils/md5.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    no: '',
    pwd: '',
    noinput: false,
    pwdinput: false,
  },
  noinput: function (e) {
    this.setData({ no: e.detail.value });
    this.setData({ noinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }

  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },
  formSubmit: function (e) {
    var that = this;
    wx.showLoading({
      title: '登录中...',
    })
    
    that.setData({ disabled: true });
    app.sendRequest({
      action: 'login',
      params: {
        ultype:'branch',
        loginid: that.data.no,
        pwd: md5.hexMD5(that.data.pwd)
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        that.setData({ no: '' });
        that.setData({ pwd: '' });
        wx.setStorageSync('kldkey', res.kldkey);
        //app.globalData.kldkey = res.kldkey;
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail(res){
        this.setData({ disabled: false });
      }
    });
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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
    if (this.data.no == '' || this.data.pwd == '') {
      this.setData({ disabled: true });
    } else {
      this.setData({ disabled: false });
    }
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