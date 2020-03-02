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
    imgList:[]
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
      usePaging: true,
      tp: '定损图片',
      kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
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
            wx.showToast({
              title: res.message,
            })
          }
        }
      })
    }
    if (e.detail.title == '图片信息') {
      app.sendRequest({
        action: 'getOrderImg',
        method: 'POST',
        data: {
          oid: that.data.type,
          usePaging: false,
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
            that.setData({
              imgList: res.data.rows
            })
          } else {
            wx.showToast({
              title: res.data.message,
            })
          }
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