const moment = require('../../utils/moment.min.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    order_name:'',
    title:'',
    page:0,
    total:0,
    order_search:'',
    srv: '',
    insur: '',
    dsy: '',
    garage: '',
    status: '',
    cmforder: '',
    recvoprname: '',
    edt: '',
    srecvdtm: '',
    erecvdtm: '',
    syydt: '',
    eyydt: '',
  },
  goDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../detail/index?id=' + e.currentTarget.dataset.item.id
    })
  },
  onSearch:function(e){
    this.setData({
      order_search: e.detail
    })
    if (e.detail !== null){
      this.setData({
        srv: '',
        insur: '',
        dsy: '',
        garage: '',
        status: '',
        cmforder: '',
        recvoprname: '',
        edt: '',
        srecvdtm: '',
        erecvdtm: '',
        syydt: '',
        eyydt: '',
      })
      this.getList();
    }
  },
  serchList:function(){
    console.log(1111)
    wx.navigateTo({
      url: '../searchlist/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.order_name){
      let type = options.order_name;
      this.setData({
        order_name: type,
        title: options.order_title
      })
      wx.setNavigationBarTitle({ title: options.order_title })
      wx.showLoading({
        title: '加载中',
      })
    }
    this.getList();
  },
  getList: function (pages) {
    var that = this;
    var sdt = moment(moment().add(app.globalData.lastMonths, 'months')).format('YYYY-MM-DD');
    var params = {
      usePaging: true,
      start: pages || 0,
      limit: 5,
      withtj: true,
      sdt: sdt,
      actid: that.data.order_name,
      title: that.data.title,
      order_search: that.data.order_search,
      srv: that.data.srv,
      insur: that.data.insur,
      dsy: that.data.dsy,
      garage: that.data.garage,
      status: that.data.status,
      cmforder: that.data.cmforder,
      recvoprname: that.data.recvoprname,
      edt: that.data.edt,
      srecvdtm: that.data.srecvdtm,
      erecvdtm: that.data.erecvdtm,
      syydt: that.data.syydt,
      eyydt: that.data.eyydt,
    };
    if (that.data.order_name == 'my_order'){
      params.for_my = true;
    }
    for (var key in params) {
      if (params[key] === '' || params[key] === '请选择') {
        delete params[key]
      }
    }
    app.sendRequest({
      action: 'getOrderInfo',
      params: params,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        let lists = res.rows;
        lists.forEach((item, index) => {
          if (item.yydt != null) {
            item.yydt = item.yydt.substring(5);
          }
        })
        if (that.data.list && pages) {
          let info = that.data.list.concat(lists);
          that.setData({
            list: info,
            page: pages,
            total: res.total
          })
        } else {
          that.setData({
            list: lists,
            page: 0,
            total: res.total
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