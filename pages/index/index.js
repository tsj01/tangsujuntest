const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    imgUrls: [
      '/image/1.png',
      '/image/2.png',
      '/image/3.png'
    ],
    order: {
      all_order: 0, //所有订单
      canconfirm_order: 0,
      candispatch_order: 0,
      canrecv_order: 0, //待回收订单
      confirmed_order: 0, //修理厂订单
      my_order: 0, //我的订单
      overdue_order: 0, //逾期订单
      todaynew_order: 0,
      todayrecv_order: 0, //本日已收
      urgent_order: 0
    } //加急订单
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getList();
  },
  getList: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    app.sendRequest({
      action: 'getOrderStatiscs',
      params: {
        months: -2,
        for_my: true,
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.rows[0];
        that.setData({
          all_order: data.all_order,
          canconfirm_order: data.canconfirm_order,
          candispatch_order: data.candispatch_order,
          canrecv_order: data.canrecv_order,
          confirmed_order: data.confirmed_order,
          my_order: data.my_order,
          overdue_order: data.overdue_order,
          todaynew_order: data.todaynew_order,
          todayrecv_order: data.todayrecv_order,
          urgent_order: data.urgent_order
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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