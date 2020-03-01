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
    this.setData({
      type: type.id
    })
    this.getDetail(type.id);
  },
  getDetail: function(e) {
    var that = this;
    app.sendRequest({
      action: 'getOrderSteps',
      params: {
        oid: e
      },
      success: function(res) {
        
        let steps = []
        res.rows.forEach((itme, index) => {
          steps.push({
            text: itme.act,
            desc: itme.dtm.slice(0, 10)
          })
        })

        that.setData({
          steps: steps
        })
      }
    })
    app.sendRequest({
      action: 'getOrder',
      params: {
        usePaging: true,
        limit: 5,
        start: 0,
        id: e,
        withtj: true
      },
      success: function(res) {
        that.setData({
          data: res.rows[0]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onChange:function(e){
    console.log(e,1111)
    var that = this;
    if (e.detail.title == '收件明细') {
      app.sendRequest({
        action: 'getOrderdtl',
        params: {
          oid: that.data.type,
          usePaging: true,
          tp:'定损图片'
        },
        success: function (res) {

          that.setData({
            list: res.rows
          })
        }
      })
    }
    if (e.detail.title == '图片信息') {
      app.sendRequest({
        action: 'getOrderImg',
        params: {
          oid: that.data.type
        },
        success: function (res) {

          that.setData({
            imgList: res.rows
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