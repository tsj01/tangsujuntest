// pages/searchlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['是', '否'],
    index: 1,
    insur:'',
    insurid:'',
    dsy:'',
    garaddr:'',
    order:'',
    recovery:''
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  choiceCompany: function () {
    console.log(1111)
    wx.navigateTo({
      url: '../searchdetail/index?brtp=保险公司'
    })
  },
  prospecting: function () {
    wx.navigateTo({
      url: '../searchdetail/index?brtp=查勘员&bid=' + this.data.insurid
    })
  },
  goGaraddr: function () {
    wx.navigateTo({
      url: '../searchdetail/index?brtp=汽修单位'
    })
  },
  goRecovery:function(){
    wx.navigateTo({
      url: '../searchdetail/index?brtp=回收人员'
    })
  },
  goStatus:function(){
    wx.navigateTo({
      url: '../searchdetail/index?brtp=订单状态'
    })
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