// pages/faxian/faxian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    order_name:'',
    title:'',
    page:0,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.order_name;
    console.log(type)
    this.setData({
      order_name: type,
      title: options.order_title
    })
    wx.setNavigationBarTitle({ title: options.order_title })
    wx.showLoading({
      title: '加载中',
    })
    this.getList();
  },
  getList: function (pages) {
    
    var that = this;
    console.log(that.data.page, pages, 111)
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=getOrderInfo',
      method: 'POST',
      data: {
        usePaging:true,
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        start: pages || 0,
        limit: 5,
        withtj: true,
        sdt: '2019 - 11 - 28',
        actid: that.data.order_name,
        title: that.data.title,
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
          if(that.data.list && pages){
            let info = that.data.list.concat(lists);
            that.setData({
              list: info,
              page:pages,
              total: res.data.total
            })
          } else {
            that.setData({
              list: lists,
              page: 0,
              total: res.data.total
            })
          }

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
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList(Number(this.data.page) + 5)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})