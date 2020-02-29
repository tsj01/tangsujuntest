var formatTime = require('../../utils/util.js')
let exif = require("../../utils/exif");
const FileSystemManager = wx.getFileSystemManager();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    orderShow:false,
    subShow:false,
    array: ['是', '否'],
    index: 1,
    time: '1212',
    date: formatTime,
    disabled: false, //设置是否能点击 false可以 true不能点击
    startDate: '2000-01-01',
    endDate: '2050-03-12',
    placeholder: '请选择时间',
    orderList: [{
      id: 0,
      isvalue: '否',
      ischeck: false,
      oid: 0,
      partname: '',
      partno: '',
      price: 0,
      status: "未收",
      showUploaderImg:false,
      attAdd: [],
    }],
    editpartname: '',
    editpartno: '',
    orderIndex: '',
    insur: '', //保险公司
    dsy: '', //勘查员
    dsyid:'',
    dsytel: '', //联系方式
    accno: '', //报案号
    plateno: '', //车牌号
    carmodel: '', //车型名称
    garaddr: '', //汽修单位
    garage: '', //详细地址
    garlxr: '', //联系人
    gartel: '', //联系方式
    isurgent: "否", //是否加急
    yydt: '', //预约日期
    memo: '', //订单备注
    insurid: '', //保险公司id
    garageid: '', //汽修公司id
    mopr:'',
    addNum:0
  },
  deleteimg(e) {
    console.log(e)
    let query = e.currentTarget.dataset['index'];
    let addQuery = e.detail.index;
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        item.attAdd.forEach((a,d)=>{
          if (addQuery == d){
            item.attAdd.splice(addQuery, 1)
          }
        })
      }
    })
    this.setData({
      orderList: this.data.orderList
    });
  },
  showUploader:function(e){
    let query = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        if(item.showUploaderImg == false) {
          item.showUploaderImg = true
        }else{
          item.showUploaderImg = false
        }
      }
    })
    this.setData({
      orderList: this.data.orderList
    });
  },
  afterReads: function (event){
    console.log(event);
    var me = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        var file = res.tempFiles;
        if (file.size >= 1024 * 1024 * 10) {
          alert('图片大小过大，应小于10M');
          wx.showToast({
            title: '图片大小过大，应小于10M',
            icon: 'fail',
            duration: 2000
          });
        }
        console.log(file,333);
        var fileTypeArr = file[0].path.split('.');
        var fileType = fileTypeArr[fileTypeArr.length - 1];
        console.log(fileType)
        FileSystemManager.readFile({
          filePath: file[0].path, 
          encoding:'base64',
          success:function(data){
            console.log(data);
            wx.showLoading({
              title: '上传中...',
            })
            app.sendRequest({
              action: 'addImageMP',
              params: {
                image_data: 'data:image/' + fileType+';base64,' + data.data
              },
              success: function (res) {
                wx.hideLoading();
                console.log(res);
                let rows = JSON.parse(res.rows);
                console.log(rows,222)
                let query = event.currentTarget.dataset['index'];
                console.log(query, me.data.orderList,777)
                me.data.orderList.forEach((item, index) => {
                  if (query == index) {
                    rows.forEach((i,v)=>{
                      item.attAdd.push({ url: 'http://kld.8866.org:8088/dingdong/static/upload/' + i.fileUrl,
                        isImage:true,
                        paththumb: i.thumbUrl,
                        sizekb: i.sizekb,
                        sizewh: i.sizewh,
                        tp: "定损照片",
                        name: i.fileName,
                        dtlid:item.id
                      })
                    })
                  }
                })
                me.setData({
                  orderList: me.data.orderList
                });
                console.log(me.data.orderList,555)
              }
            });
          },
          fail:function(res){
            console.log(res);
          }
        });
      }
    })
  },
  // afterRead(event) {
  //   //exif.getData();
  //   var me = this;
  //   const {
  //     file
  //   } = event.detail;
    
  //   console.log(event,11111);
  //   if (file.size >= 1024 * 1024 * 10) {
  //     alert('图片大小过大，应小于10M');
  //     wx.showToast({
  //       title: '图片大小过大，应小于10M',
  //       icon: 'fail',
  //       duration: 2000
  //     });
  //   }
  //   console.log(file,333)
  //   var fileTypeArr = file[0].path.split('.');
  //   var fileType = fileTypeArr[fileTypeArr.length - 1];
  //   console.log(fileType)
  //   FileSystemManager.readFile({ 
  //     filePath: file[0].path, 
  //     encoding:'base64',
  //     success:function(data){
  //       console.log(data);
  //       wx.showLoading({
  //         title: '上传中...',
  //       })
  //       app.sendRequest({
  //         action: 'addImageMP',
  //         params: {
  //           image_data: 'data:image/' + fileType+';base64,' + data.data
  //         },
  //         success: function (res) {
  //           wx.hideLoading();
  //           console.log(res);
  //           let rows = JSON.parse(res.rows);
  //           console.log(rows,222)
  //           let query = event.currentTarget.dataset['index'];
  //           console.log(query, me.data.orderList,777)
  //           me.data.orderList.forEach((item, index) => {
  //             if (query == index) {
  //               rows.forEach((i,v)=>{
  //                 item.attAdd.push({ url: 'http://kld.8866.org:8088/dingdong/static/upload/' + i.fileUrl,
  //                   isImage:true,
  //                   paththumb: i.thumbUrl,
  //                   sizekb: i.sizekb,
  //                   sizewh: i.sizewh,
  //                   tp: "定损照片",
  //                   name: i.fileName,
  //                   dtlid:item.id
  //                  })
  //               })
  //             }
  //           })
  //           me.setData({
  //             orderList: me.data.orderList
  //           });
  //           console.log(me.data.orderList,555)
  //         }
  //       });
  //     },
  //     fail:function(res){
  //       console.log(res);
  //     }
  //   });
  // },
  checkboxChange: function(e) {
    console.log(e,111)
    let query = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index && item.ischeck == false) {
          item.ischeck = true
      } else {
          item.ischeck =false
      }
    })
    this.setData({
      orderList: this.data.orderList
    });
  },
  edit: function(e) {
    let query = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        this.setData({
          editpartname: item.partname,
          editpartno: item.partno,
          orderIndex: query
        });
      }
    })
    this.setData({
      orderShow: true
    });
  },
  add: function(e) {
    let i = this.data.addNum -1;
    this.data.orderList.push({
      id: i,
      isvalue: '否',
      ischeck: false,
      oid: 0,
      partname: "",
      partno: "",
      price: 0,
      status: "未收",
      showUploaderImg:false,
      attAdd:[]
    })
    this.setData({
      orderList: this.data.orderList,
      addNum:i
    })
    console.log(this.data.orderList)
  },
  subOrderlist: function() {
    this.data.orderList.forEach((item, index) => {
      if (this.data.orderIndex == index) {
        item.partname = this.data.editpartname;
        item.partno = this.data.editpartno
      }
    })
    this.setData({
      orderList: this.data.orderList,
      orderShow: false
    })
  },
  delOrderlist: function() {
    this.data.orderList.splice(this.orderIndex, 1)
    this.setData({
      orderList: this.data.orderList,
      orderShow: false
    })
  },
  editpartnameOnChange: function(event) {
    this.setData({
      editpartname: event.detail
    })
  },
  editpartnoOnChange: function(event) {
    this.setData({
      editpartno: event.detail
    })
  },
  onPickerChange: function(e) {
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
      orderShow: false
    });
  },
  onChange(event) {},
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          editpartno:res.result
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
    wx.navigateTo({
      url: '../choicelist/index?brtp=保险公司'
    })
  },
  prospecting: function() {
    wx.navigateTo({
      url: '../choicelist/index?brtp=查勘员&bid=' + this.data.insurid
    })
  },
  goGaraddr: function() {
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
      that.setData({
        date: that.getCurrentDate(),
        placeholder: that.getCurrentDate(),
      })
  },
  getCurrentDate() {
    var timeStr = '-';
    var curDate = new Date();
    var curYear = curDate.getFullYear();  //获取完整的年份(4位,1970-????)
    var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
    var curDay = curDate.getDate();       //获取当前日(1-31)
    var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
    var curHour = curDate.getHours();      //获取当前小时数(0-23)
    var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
    var curSec = curDate.getSeconds();      //获取当前秒数(0-59)
    var Current = curYear + timeStr + curMonth + timeStr + curDay + ' ' + curHour + ':' + curMinute + ':' + curSec;
    console.log(Current);
    // this.datetime=Current;
    return Current;
  },
  accnoChange:function(event){
    this.setData({
      accno: event.detail
    })
  },
  platenoChange: function (event){
    this.setData({
      plateno: event.detail
    })
  },
  carmodelChange:function(event) {
    this.setData({
      carmodel: event.detail
    })
  },
  garlxrChange: function (event) {
    this.setData({
      garlxr: event.detail
    })
  },
  gartelChange: function (event) {
    this.setData({
      gartel: event.detail
    })
  },
  memoChange: function (event) {
    this.setData({
      memo: event.detail
    })
  },
  storage: function() {
    let that = this;
    let arr = [];
    that.data.orderList.forEach((item,index)=>{
      item.attAdd.forEach((a,d)=>{
        arr.push(a);
      })
    })
    let params = {
      isSubmit: false,
      checkSdt: "2019-12-07",
      act: "add",
      mst: {
        id: 0,
        accno: that.data.accno,
        carmodel: "eeee",
        dept: null,
        dsy: that.data.dsy,
        dsyid: that.data.dsyid,
        dsytel: that.data.dsytel,
        garaddr: that.data.garaddr,
        garage: that.data.garage,
        garageid: that.data.garageid,
        garlxr: that.data.garlxr,
        gartel: that.data.gartel,
        insur: that.data.insur,
        insurid: that.data.insurid,
        isdisp: "未派单",
        isurgent: that.data.isurgent,
        memo: that.data.memo,
        plateno: that.data.plateno,
        srv: "",
        srvid: 701,
        srvopr: that.data.mopr,
        status: "已暂存",
        yydt: that.data.date
      },
      dtlAdd: that.data.orderList,
      dtlUpd: [],
      dtlDel: [],
      attAdd: arr,
      attUpd: [],
      attDel: []
    }
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=saveOrder',
      method: 'POST',
      data: {
        rows: JSON.stringify(params),
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
        if (res.statusCode == 200) {
          wx.redirectTo({
            url: '../list/index'
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  },
  submits:function(){
    if (this.data.insur == '') {
      wx.showToast({
        title: '请输入保险公司',
      })
      return;
    }
    if (this.data.dsy == '') {
      wx.showToast({
        title: '请输入勘查员',
      })
      return;
    }
    if (this.data.accno == '') {
      wx.showToast({
        title: '请输入报案号',
      })
      return;
    }
    if (this.data.plateno == '') {
      wx.showToast({
        title: '请输入车牌号',
      })
      return;
    }
    if (this.data.carmodel == '') {
      wx.showToast({
        title: '请输入车型名称',
      })
      return;
    } 
    if (this.data.garlxr == '') {
      wx.showToast({
        title: '请输入联系人',
      })
      return;
    }
    if (this.data.gartel == '') {
      wx.showToast({
        title: '请输入联系方式',
      })
      return;
    }
    
    if (this.data.date == '') {
      wx.showToast({
        title: '请输入预约日期',
      })
      return;
    }
    if (this.data.orderList.lenth >= 1) {
      wx.showToast({
        title: '请输入订单明细',
      })
      return;
    }
    this.setData({
      subShow:true
    })
  },
  subOrder:function(){
    let that = this;
    let params = {
      isSubmit: true,
      checkSdt: "2019-12-07",
      act: "add",
      mst: {
        id: 0,
        accno: that.data.accno,
        carmodel: "eeee",
        dept: null,
        dsy: that.data.dsy,
        dsyid: that.data.dsyid,
        dsytel: that.data.dsytel,
        garaddr: that.data.garaddr,
        garage: that.data.garage,
        garageid: that.data.garageid,
        garlxr: that.data.garlxr,
        gartel: that.data.gartel,
        insur: that.data.insur,
        insurid: that.data.insurid,
        isdisp: "未派单",
        isurgent: that.data.isurgent,
        memo: that.data.memo,
        plateno: that.data.plateno,
        srv: "",
        srvid: 701,
        srvopr: that.data.mopr,
        status: "已暂存",
        yydt: that.data.date
      },
      dtlAdd: that.data.orderList,
      dtlUpd: [],
      dtlDel: [],
      attAdd: [],
      attUpd: [],
      attDel: []
    }
    wx.request({
      url: 'http://kld.8866.org:8088/dingdong/mobile/doAction?method=saveOrder',
      method: 'POST',
      data: {
        rows: JSON.stringify(params),
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
          wx.redirectTo({
            url: '../list/index'
          })
        } else {
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
    this.setData({
      subShow: false
    })
  },
  delOrder:function(){
    this.setData({
      subShow: false
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