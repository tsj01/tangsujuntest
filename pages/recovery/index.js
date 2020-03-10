// pages/recovery/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemStatus: [
      { name: 'not', value: '未收' ,checked: 'true'},
      { name: 'yes', value: '已收' },
      { name: 'no', value: '不收' },
    ],
    items: [
      { name: 'repair', value: '已被修理厂处理' },
      { name: 'company', value: '保险公司改配件', checked: 'true' },
      { name: 'parts', value: '配件无价值' },
      { name: 'other', value: '其他情况' },
    ],
    status:'',
    reasonStatus:'',
    datas:'',
    imgListLoss:[],
    imgListRecovery:[]
  },
  radioChange:function(e){
    console.log(e,1111)
    this.setData({
      status:e.detail.value
    })
  },
  reasonChange:function(e){
    this.setData({
      reasonStatus: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.list) {
      let datas = JSON.parse(options.list);
      this.setData({
        datas:datas
      })
      console.log(datas)
      this.getList(datas.id, datas.oid)
    }
  },
  getList:function(id,oid){
    let that = this;
    app.sendRequest({
      action: 'getOrderImg',
      params: {
        limit: -1,
        start: 0,
        tp: '定损照片',
        oid: oid,
        dtlid: id,
        openid:'',
        nickname:'',
        ver: 200,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          imgListLoss:res.rows
        })
      }
    })
    app.sendRequest({
      action: 'getOrderImg',
      params: {
        limit: -1,
        start: 0,
        tp: '回收照片',
        oid: oid,
        dtlid: id,
        openid: '',
        nickname: '',
        ver: 200,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          imgListRecovery: res.rows
        })
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