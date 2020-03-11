// pages/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      }
    ],
    data:{},
    type:'',
    list:[],
    imgList:[],
    recoveryList: [],
    repairList: [],
    url: app.globalData.attrUrl,
    imgUrls:[]
  },
  imgYu: function (event) {
    console.log(event)
    var that = this;
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgUrls = that.data.imgUrls;//获取data-list
    imgUrls.push(src)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgUrls // 需要预览的图片http链接列表
    })
  },
  listdetail:function(e){
    let info = JSON.stringify(this.data.list[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '../recovery/index?list=' + info
    })
  },
  modify:function(e){
    let info = JSON.stringify(this.data.data);
    wx.navigateTo({
      url: '../newOrder/index?name=modify&type='+this.data.type + '&data='+ info
    })
  },
  copy:function(e){
    let info = JSON.stringify(this.data.data);
    wx.navigateTo({
      url: '../newOrder/index?name=copy&data=' + info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options;
    console.log(options,111)
    this.setData({
      type: type.id
    })
    this.getDetail(type.id);
  },
  getDetail: function(e) {
    var that = this;
    var paramssteps = {
      oid: e,
      usePaging: false,
      openid: '',
      nickname: '',
      ver: 200
    }
    var paramsorder = {
      usePaging: true,
      limit: 5,
      start: 0,
      id: e,
      withtj: true,
      openid: '',
      nickname: '',
      ver: 200
    }
    
    app.sendRequest({
      action: 'getOrderSteps',
      method: 'POST',
      params: paramssteps,
      success: function(res) {
        if (res.success == true) {
          let steps = []
          res.rows.forEach((itme,index)=>{
            steps.push({
              text: itme.act,
              desc: itme.dtm.slice(0, 10)
            })
          })
          that.setData({
            steps: steps
          })
        } else {
        }
      }
    })
    app.sendRequest({
      action: 'getOrder',
      method: 'POST',
      params: paramsorder,
      success: function(res) {
        if (res.success == true) {
            for (let key in res.rows[0]) {
              res.rows[0][key] == null ? res.rows[0][key] = '' : res.rows[0][key];
            }
          that.setData({
            data: res.rows[0]
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
  onChange:function(e){
    var that = this;
    let params = {
      oid: that.data.type,
      usePaging: false,
      openid: '',
      nickname: '',
      ver: 200
    }
    if (e.detail.title == '收件明细') {
      app.sendRequest({
        action: 'getOrderdtl',
        method: 'POST',
        params: params,
        success: function (res) {
          if (res.success == true) {
            that.setData({
              list: res.rows
            })
          } else {

          }
        }
      })
    }
    if (e.detail.title == '图片信息') {
      app.sendRequest({
        action: 'getOrderImg',
        params: {
          oid: that.data.type,
          usePaging: true,
          tp: '定损照片',
          openid: '',
          nickname: '',
          ver: 200
        },
        success: function (res) {
          that.setData({
            imgList: res.rows,
          })
        }
      })
      app.sendRequest({
        action: 'getOrderImg',
        params: {
          oid: that.data.type,
          usePaging: true,
          tp: '回收照片',
          openid: '',
          nickname: '',
          ver: 200
        },
        success: function (res) {
          that.setData({
            recoveryList: res.rows,
          })
        }
      })
      app.sendRequest({
        action: 'getOrderImg',
        params: {
          oid: that.data.type,
          usePaging: true,
          tp: '维修照片',
          openid: '',
          nickname: '',
          ver: 200
        },
        success: function (res) {
          that.setData({
            repairList: res.rows,
          })
        }
      })
    }
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