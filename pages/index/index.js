// pages/index/index.js
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
    wx.showLoading({
      title: '加载中',
    })
    
    this.getList();
  },
  getList: function() {
    var that = this;
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=getOrderStatiscs',
      method: 'POST',
      data: {
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        months: -2,
        for_my: true,
        usePaging: false,
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.hideLoading();
          that.setData({
            all_order: res.data.rows[0].all_order,
            canconfirm_order: res.data.rows[0].canconfirm_order,
            candispatch_order: res.data.rows[0].candispatch_order,
            canrecv_order: res.data.rows[0].canrecv_order,
            confirmed_order: res.data.rows[0].confirmed_order,
            my_order: res.data.rows[0].my_order,
            overdue_order: res.data.rows[0].overdue_order,
            todaynew_order: res.data.rows[0].todaynew_order,
            todayrecv_order: res.data.rows[0].todayrecv_order,
            urgent_order: res.data.rows[0].urgent_order
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            icon: 'none'
          });
        }
      }

    })
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