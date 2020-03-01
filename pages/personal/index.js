// pages/wode/wode.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brtp:"",
    brname:"",
    loginid:"",
    name:"",
    dname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getList();
  },
  getList: function() {
    var that = this;
    app.sendRequest({
      action: 'getUserInfo',
      method: 'POST',
      data: {
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        uid_: 15372697233,
        limit: true,
        usePaging: false,
        openid: "",
        nickname: "",
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          that.setData({
            brtp: res.data.rows[0].brtp,
            brname: res.data.rows[0].brname,
            loginid: res.data.rows[0].loginid,
            name: res.data.rows[0].name,
            dname: res.data.rows[0].dname
          })

        } else {

        }
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

  }
})