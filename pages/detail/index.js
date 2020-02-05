// pages/detail/index.js
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
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options;
    console.log(type, 111)
    this.getDetail(type.id);
  },
  getDetail: function(e) {
    var that = this;
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=getOrderSteps',
      method: 'POST',
      data: {
        oid: e,
        usePaging: false,
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        openid: '',
        nickname: '',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          let steps = []
          res.data.rows.forEach((itme,index)=>{
            steps.push({
              text: itme.act,
              desc: itme.dtm.slice(0, 10)
            })
          })
          console.log(steps,555)
          that.setData({
            steps: steps
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=getOrder',
      method: 'POST',
      data: {
        usePaging: true,
        limit: 5,
        start: 0,
        id: e,
        withtj: true,
        kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313',
        openid: '',
        nickname: '',
        ver: 200
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            data: res.data.rows[0]
          })
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