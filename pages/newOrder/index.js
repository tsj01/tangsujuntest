Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    array: ['是', '否'],
    index: 1,
    time: '1212',
    date: '2019-01-01 13:37',
    disabled: false, //设置是否能点击 false可以 true不能点击
    startDate: '2019-01-01 12:37',
    endDate: '2050-03-12 12:38',
    placeholder: '请选择时间',
    orderList: [{
        name: '配件吗',
        num: 1212
      },
      {
        name: '配件吗',
        num: 1212
      },
      {
        name: '配件吗',
        num: 1212
      },
      {
        name: '配件吗',
        num: 1212
      },
      {
        name: '配件吗',
        num: 1212
      },
      {
        name: '配件吗',
        num: 1212
      }
    ],
    fileList: [{
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      name: '图片1'
    }, ],
    // rows: {
    //   "isSubmit": true,
    //   "checkSdt": "2019-12-04",
    //   "act": "add",
    //   "mst": {
    //     "id": 0,
    //     "accno": "报案号",
    //     "carmodel": "车型名称",
    //     "dept": null,
    //     "dsy": "陈波",
    //     "dsyid": 3240,
    //     "dsytel": "18667809278",
    //     "garaddr": "安利汽修",
    //     "garage": "安利汽修",
    //     "garageid": 6626,
    //     "garlxr": "接待",
    //     "gartel": "15558263933",
    //     "insur": "永安",
    //     "insurid": 712,
    //     "isdisp": "未派单",
    //     "isurgent": "否",
    //     "memo": "是的",
    //     "plateno": "车牌号",
    //     "srv": "宁波格斯美",
    //     "srvid": 701,
    //     "srvopr": "嵇丽丽",
    //     "status": "已提交",
    //     "yydt": "2020-02-05 14:00:00"
    //   },
    //   "dtlAdd": [{
    //     "id": 0,
    //     "isvalue": "否",
    //     "oid": 0,
    //     "partname": "配件名称",
    //     "partno": "易碎贴",
    //     "price": 0,
    //     "status": "未收"
    //   }],
    //   "dtlUpd": [],
    //   "dtlDel": [],
    //   "attAdd": [],
    //   "attUpd": [],
    //   "attDel": []
    // },
    insur:'',//保险公司
    dsy:'陈波',//勘查员
    dsytel:'18667809278',//联系方式
    accno:'报案号',//报案号
    plateno:'车牌号',//车牌号
    carmodel: '车型名称',//车型名称
    garaddr: "安利汽修",//汽修单位
    garage: "安利汽修",//详细地址
    garlxr: "接待",//联系人
    gartel: "15558263933",//联系方式
    isurgent: "否",//是否加急
    yydt: "2020-02-05 14:00:00",//预约日期
    memo: "是的",//订单备注
    insurid:'',//保险公司id
    garageid:''//汽修公司id
  },
  deleteimg(e) {
    console.log(e)
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({ ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      }
    });
  },
  edit: function(e) {
    let query = e.currentTarget.dataset['index'];
    console.log(query, 1111)
    this.setData({
      show: true
    });
  },
  onPickerChange: function(e) {
    console.log(e.detail);
    this.setData({
      date: e.detail.dateString
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    console.log(event, 111)
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        var scanType = res.scanType;
        var charSet = res.charSet;
        var path = res.path;
        _this.setData({
          result: result,
          scanType: scanType,
          charSet: charSet,
          path: path
        })
      }
    })
    // 只允许从相机扫码
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
  choiceCompany: function() {
    console.log(111)
    wx.navigateTo({
      url: '../choicelist/index?brtp=保险公司'
    })
  },
  prospecting: function() {
    wx.navigateTo({
      url: '../choicelist/index?brtp=查勘员&bid=' + this.data.insurid
    })
  },
  goGaraddr: function(){
    wx.navigateTo({
      url: '../choicelist/index?brtp=汽修单位'
    })
  },
  goGarlxr: function() {
    wx.navigateTo({
      url: '../choicelist/index?brtp=汽修联系人&bid=' + this.data.garageid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    setTimeout(function() {
      console.log('doSomething')
      that.setData({
        date: '2019-01-01 13:37',
        placeholder: '2019-01-01 13:37',
      })
    }, 2000);
    console.log(options)
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