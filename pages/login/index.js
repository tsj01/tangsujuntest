const app = getApp()
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
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    this.setData({ disabled: true });
    app.sendRequest({
      action: 'login',
      params: {
        ultype:'branch',
        loginid: e.detail.value.no,
        pwd: e.detail.value.pwd
      },
      success: function (res) {
        console.log(res);
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