// pages/checklist/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    type: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.brtp;
    this.setData({
      type: type,
    })
    if (options.brtp == "保险公司") {
      this.getCompany(options.brtp)
    }
    if (options.brtp == "查勘员") {
      this.getSurvey(options.bid)
    }
    if (options.brtp == "汽修单位") {
      this.getGaraddr(options.brtp)
    }
    if (options.brtp == "汽修联系人") {
      this.getGarlxr(options.bid)
    }
  },
  getCompany: function(e) {

    var that = this;
    app.sendRequest({
      action: 'getBranch',
      method: 'POST',
      data: {
        usePaging: true,
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        start: 0,
        limit: 20,
        brtp: e,
        openid: '',
        nickname: '',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          that.setData({
            list: res.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  },
  getGaraddr: function(e) {

    var that = this;
    app.sendRequest({
      action: 'getBranch',
      method: 'POST',
      data: {
        usePaging: true,
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        start: 0,
        limit: 20,
        brtp: e,
        openid: '',
        nickname: '',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          that.setData({
            list: res.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  },
  getSurvey: function(e) {

    var that = this;
    app.sendRequest({
      action: 'getUser',
      method: 'POST',
      data: {
        usePaging: true,
        limit: 20,
        start: 0,
        bid: e,
        dname: "",
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
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
          wx.stopPullDownRefresh();
          that.setData({
            list: res.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  },
  getGarlxr: function (e) {
    var that = this;
    app.sendRequest({
      action: 'getUser',
      method: 'POST',
      data: {
        usePaging: true,
        limit: 20,
        start: 0,
        bid: e,
        dname: "",
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        openid: "",
        nickname: "",
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          that.setData({
            list: res.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  },
  choiceCompany: function(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (this.data.type == "保险公司") {
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        insurid: e.currentTarget.dataset.item.id,
        insur: e.currentTarget.dataset.item.shortname,
        mopr: e.currentTarget.dataset.item.mopr,
      })
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })
    }
    if (this.data.type == "汽修单位"){
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        garaddr: e.currentTarget.dataset.item.shortname,
        garage: e.currentTarget.dataset.item.braddr,
        garageid: e.currentTarget.dataset.item.id
      })
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })
    }
    if (this.data.type == "查勘员") {
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        dsy: e.currentTarget.dataset.item.name,
        dsytel: e.currentTarget.dataset.item.tel,
        dsyid: e.currentTarget.dataset.item.id
      })
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })
    }
    if (this.data.type == "汽修联系人") {
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        garlxr: e.currentTarget.dataset.item.name,
        gartel: e.currentTarget.dataset.item.tel
      })
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      })
    }
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },

  onClick() {
    Toast('搜索' + this.data.value);
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
    this.getCompany(this.data.type)
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