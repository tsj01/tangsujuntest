// pages/searchlist/index.js
var formatTime = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endtime: formatTime,
    array: ['是', '否'],
    index: 1,
    insur:'',
    insurid:'',
    dsy:'',
    garaddr:'',
    order:'',
    recovery:'',
    setDate: '请选择',
    endSetDate: '请选择',
    orderDate: '请选择',
    endOrderDate: '请选择',
    getDate: '请选择',
    endGetDate: '请选择',
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindSetDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      setDate: e.detail.value
    })
  },
  bindEndSetDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endSetDate: e.detail.value
    })
  },
  bindOrderDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderDate: e.detail.value
    })
  },
  bindEndOrderDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endOrderDate: e.detail.value
    })
  },
  bindGetDateChange:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      getDate: e.detail.value
    })
  },
  bindEndGetDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endGetDate: e.detail.value
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
  search:function(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      insur: this.data.insur,
      dsy: this.data.dsy,
      garage: this.data.garaddr,
      status: this.data.order,
      cmforder: this.data.array[this.data.index],
      recvoprname: this.data.recovery,
      sdt: this.data.setDate,
      edt: this.data.endSetDate,
      srecvdtm: this.data.getDate,
      erecvdtm: this.data.endGetDate,
      syydt: this.data.orderDate,
      eyydt: this.data.endOrderDate,
    })
    wx.navigateBack({
      delta: 1,// 返回上一级页面。
      success: function () {
        prevPage.getList(); // 执行前一个页面的getList方法
      }
    })
  },
  empty:function(e){
    this.setData({
      index: 1,
      insur: '',
      insurid: '',
      dsy: '',
      garaddr: '',
      order: '',
      recovery: '',
      setDate: '请选择',
      endSetDate: '请选择',
      orderDate: '请选择',
      endOrderDate: '请选择',
      getDate: '请选择',
      endGetDate: '请选择',
    })
  },
  backe:function(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    wx.navigateBack({
      delta: 1,// 返回上一级页面。
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