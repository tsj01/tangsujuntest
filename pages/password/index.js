var md5 = require('../../utils/md5.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpwd:'',
    newpwd:'',
    setpwd:''
  },
  oldpwdChange:function(e){
    this.setData({
      oldpwd: e.detail
    })
  },
  newpwdChange: function (e) {
    console.log(e)
    this.setData({
      newpwd: e.detail
    })
  },
  setpwdChange: function (e) {
    this.setData({
      setpwd: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.oldpwd)
  },
  submit() {
    var that = this;
    console.log(11111)
    console.log(that.data.oldpwd);
    if (that.data.newpwd !== that.data.setpwd) {
      wx.showToast({
        title: '新密码与确认密码不一样',
        icon: 'none',
      })
      return;
    }
    app.sendRequest({
      action: 'resetpwd',
      method: 'POST',
      data: {
        old_pwd: md5.hexMD5(that.data.oldpwd),
        new_pwd: md5.hexMD5(that.data.newpwd),
        usePaging: false,
        uid_: '',
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        openid: '',
        nickname: '',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: res.data.message,
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
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