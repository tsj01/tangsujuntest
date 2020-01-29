// pages/faxian/faxian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    order_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.order_name;
    console.log(type)
    this.setData({
      order_name: type
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getList();
  },
  getList: function () {
    var that = this;
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=getOrderInfo',
      method: 'POST',
      data: {
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        start: 0,
        limit: true,
        withtj: true,
        sdt: '2019 - 11 - 28',
        actid: that.data.order_name,
        title:'所有订单',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.hideLoading();
          let lists = res.data.rows;
          lists.forEach((item,index)=>{
            if (item.yydt!=null){
              item.yydt = item.yydt.substring(5);
              console.log(item.yydt.substring(5))
            }
          })

          that.setData({
            list: lists
          })

        } else {

        }
      }
    })
  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    //   this.fetchArticleList(this.data.page + 1)
    // }
    console.log(1111)
    wx.showLoading({
      title: '加载中',
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