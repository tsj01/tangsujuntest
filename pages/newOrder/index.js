let formatTime = require('../../utils/util.js')
let dateTimePicker = require('../../utils/dateTimePicker.js')
let exif = require("../../utils/exif");
const FileSystemManager = wx.getFileSystemManager();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDate: '',
    startT:'',
    dateTimeArray:'',
    active: 0,
    show: false,
    orderShow: false,
    subShow: false,
    array: ['是', '否'],
    index: 1,
    time: '1212',
    date: formatTime,
    disabled: false, //设置是否能点击 false可以 true不能点击
    orderList: [{
      id: 0,
      isvalue: '否',
      ischeck: false,
      oid: 0,
      partname: '',
      partno: '',
      price: 0,
      status: "未收",
      showUploaderImg: false,
      attAdd: [],
    }],
    updOrderList:[],
    dtlUpd:[],
    editpartname: '',
    editpartno: '',
    orderIndex: '',
    insur: '', //保险公司
    dsy: '', //勘查员
    dsyid: '',
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
    checkSdt:'',
    mopr: '',
    addNum: 0,
    act: 'add',
    id: 0,
    detailTypeid: '',
    imgUrls: [],
    srv: '',
    srvid: '',
    updStatus:''
  },
  imgYu: function(event) {
    console.log(event)
    let that = this;
    let src = event.currentTarget.dataset.src; //获取data-src
    let arr = [];
    that.data.orderList.forEach((i,v)=>{
      if (event.currentTarget.dataset.id == v){
        i.attAdd.forEach((a,d)=>{
          arr.push(a.url);
        })
      }
    })
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  bindOrderDateChange: function(e) {
    this.setData({
      orderDate: e.detail.value
    })
    var startT = dateTimePicker.formatPickerDateTime(this.data.dateTimeArray, this.data.orderDate)
    this.setData({
      startT: startT
    })
  },
  deleteimg(e) {
    console.log(e)
    let query = e.currentTarget.dataset['id'];
    let addQuery = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        item.attAdd.forEach((a, d) => {
          if (addQuery == d) {
            item.attAdd.splice(addQuery, 1)
          }
        })
      }
    })
    this.setData({
      orderList: this.data.orderList
    });
    console.log(this.data.orderList, 3333)
  },
  showUploader: function(e) {
    let query = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        if (item.showUploaderImg == false) {
          item.showUploaderImg = true
        } else {
          item.showUploaderImg = false
        }
      }
    })
    this.setData({
      orderList: this.data.orderList
    });
  },
  afterReads: function(event) {
    console.log(event);
    var me = this;
    var id = event.currentTarget.dataset.id;
    wx.chooseImage({
      count: 9,
      sourceType: ['album', 'camera'],
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
        console.log(file, 333);
        var fileTypeArr = file[0].path.split('.');
        var fileType = fileTypeArr[fileTypeArr.length - 1];
        console.log(fileType);

        wx.getSetting({
          success: (resSting) => {
            console.log(JSON.stringify(resSting))
            // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
            // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
            // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
            if (resSting.authSetting['scope.userLocation'] != undefined && resSting.authSetting['scope.userLocation'] != true) {
              wx.showModal({
                title: '请求授权当前位置',
                content: '需要获取您的地理位置，请确认授权',
                success: function(resshowModal) {
                  if (resshowModal.cancel) {
                    wx.showToast({
                      title: '拒绝授权',
                      icon: 'none',
                      duration: 1000
                    })
                  } else if (resshowModal.confirm) {
                    wx.openSetting({
                      success: function(dataAu) {
                        if (dataAu.authSetting["scope.userLocation"] == true) {
                          // wx.showToast({
                          //   title: '授权成功',
                          //   icon: 'success',
                          //   duration: 1000
                          // })
                          me.getLocation(me, file, fileType, id);

                        } else {
                          // wx.showToast({
                          //   title: '授权失败',
                          //   icon: 'none',
                          //   duration: 1000
                          // })
                        }
                      }
                    })
                  }
                }
              })
            } else if (resSting.authSetting['scope.userLocation'] == undefined) {
              //调用wx.getLocation的API
              me.getLocation(me, file, fileType, id);
            } else {
              //调用wx.getLocation的API
              me.getLocation(me, file, fileType, id);
            }
          }
        })
      }
    })
  },
  getLocation: function(me, file, fileType, id) {
    wx.getLocation({
      type: 'gcj02',
      success: function(locInfo) {
        console.log(locInfo);

        // wx.request({
        //   url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + locInfo.latitude + ',' + locInfo.longitude+'&key=THFBZ-4MCCF-3HGJI-JGMF2-3OYPZ-AZB4A',
        //   success: function (result) {
        //     console.log(result.data.result.address_component.city)

        //   }

        // })
        me.uploadImage(me, file, fileType, id, locInfo);
      },
      fail: function(locInfo) {
        console.log(locInfo);
      }
    })
  },
  uploadImage: function(me, file, fileType, id, locInfo) {
    FileSystemManager.readFile({
      filePath: file[0].path,
      encoding: 'base64',
      success: function(data) {
        console.log(data);
        wx.showLoading({
          title: '上传中...',
        })
        app.sendRequest({
          action: 'addImageMP',
          params: {
            image_data: 'data:image/' + fileType + ';base64,' + data.data,
            locInf: '',
            lng: locInfo.longitude,
            lat: locInfo.latitude
          },
          success: function(res) {
            wx.hideLoading();
            console.log(res);
            let rows = JSON.parse(res.rows);
            console.log(rows, 222)
            me.data.orderList.forEach((item, index) => {
              if (id == item.id) {
                rows.forEach((i, v) => {
                  item.attAdd.push({
                    url: app.globalData.attrUrl + i.fileUrl,
                    isImage: true,
                    paththumb: app.globalData.attrUrl + i.thumbUrl,
                    sizekb: i.sizekb,
                    sizewh: i.sizewh,
                    tp: "定损照片",
                    name: i.fileName,
                    dtlid: item.id
                  })
                })
              }
            })
            me.setData({
              orderList: me.data.orderList
            });
            console.log(me.data.orderList, 555)
          }
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  checkboxChange: function(e) {
    let query = e.currentTarget.dataset['index'];
    this.data.orderList.forEach((item, index) => {
      if (query == index) {
        if (item.ischeck == false) {
          item.ischeck = true
        } else {
          item.ischeck = false
        }
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
    if (this.data.updStatus == '修改') {
      let i = this.data.addNum - 1;
      let updOrderList = [];
      updOrderList.push({
        id: i,
        isvalue: '否',
        ischeck: false,
        oid: 0,
        partname: "",
        partno: "",
        price: 0,
        status: "未收",
        showUploaderImg: false,
        attAdd: []
      })
      this.setData({
        updOrderList: updOrderList,
        addNum: i
      })
      console.log(this.data.updOrderList,44444)
    }
    let i = this.data.addNum - 1;
    this.data.orderList.push({
      id: i,
      isvalue: '否',
      ischeck: false,
      oid: 0,
      partname: "",
      partno: "",
      price: 0,
      status: "未收",
      showUploaderImg: false,
      attAdd: []
    })
    this.setData({
      orderList: this.data.orderList,
      addNum: i
    })
    console.log(this.data.orderList)
  },
  subOrderlist: function() {
    this.data.orderList.forEach((item, index) => {
      if (this.data.orderIndex == index) {
        item.partname = this.data.editpartname;
        item.partno = this.data.editpartno;
        if (this.data.updStatus == '修改') {
          console.log(item,'修改暂存111')
          this.data.dtlUpd.push({
            partname: item.partname,
            partno: item.partno,
            oid: item.oid,
            id:item.id
          })
          this.setData({
            dtlUpd: this.data.dtlUpd,
          })
          console.log(this.data.dtlUpd, '修改暂存')
        }
      }
    })
    this.setData({
      orderList: this.data.orderList,
      orderShow: false
    })

  },
  delOrderlist: function() {
    this.data.orderList.splice(this.data.orderIndex, 1)
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
          editpartno: res.result
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
    
    let start = app.initTime();
    let obj = dateTimePicker.dateTimePicker(2015, 2060, start);
    this.setData({
      orderDate: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    });
    let startT = dateTimePicker.formatPickerDateTime(this.data.dateTimeArray, this.data.orderDate)
    this.setData({
      startT: startT
    })
    let that = this;
    that.getLoginInfo();
    if (options.data) {
      let datas = JSON.parse(options.data);
      console.log(datas,6666)
      that.getOrderdtl(datas);
      if (options.name == 'modify') {
        that.setData({
          act: 'upd',
          detailTypeid: options.type
        })
      }
      if (options.name == 'copy') {
        that.setData({
          act: 'add'
        })
      }
      that.setData({
        id: datas.id,
        accno: datas.accno,
        carmodel: datas.carmodel,
        dept: datas.dept,
        dsy: datas.dsy,
        dsyid: datas.dsyid,
        dsytel: datas.dsytel,
        garaddr: datas.garaddr,
        garage: datas.garage,
        garageid: datas.garageid,
        garlxr: datas.garlxr,
        gartel: datas.gartel,
        insur: datas.insur,
        insurid: datas.insurid,
        isdisp: datas.isdisp,
        isurgent: datas.isurgent,
        memo: datas.memo,
        plateno: datas.plateno,
        srv: datas.srv,
        srvid: datas.srvid,
        srvopr: datas.mopr,
        status: datas.status,
        startT: datas.yydt,
      })
    }
    console.log(that.data.updStatus,33333)
  },
  getOrderdtl:function(e){
    let that = this;
    console.log(e);
    app.sendRequest({
      action: 'getOrderdtl',
      params: {
        oid:e.id,
        openid:'',
        nickname:'',
        ver: 200
      },
      success: function (res) {
        console.log(res,'mingxi')
        orderList: [{
          id: 0,
          isvalue: '否',
          ischeck: false,
          oid: 0,
          partname: '',
          partno: '',
          price: 0,
          status: "未收",
          showUploaderImg: false,
          attAdd: [],
        }]
        let arr = [];
        res.rows.forEach((item,index)=>{
          arr.push({
            isvalue: item.isvalue,
            ischeck: item.forRecv,
            oid: item.oid,
            id:item.id,
            partname: item.partname,
            partno: item.partno,
            price: item.price,
            status: item.status,
            showUploaderImg: false,
            attAdd: [],
          })
        })
        console.log(arr)
        that.setData({
          updStatus:'修改',
          orderList:arr
        })
        app.sendRequest({
          action: 'getOrderImg',
          params: {
            oid: e.id,
            tp: '定损照片',
            openid: '',
            nickname: '',
            ver: 200
          },
          success: function (res) {

            console.log(that.data.orderList,res, 'mingxi')
            that.data.orderList.forEach((item,index)=>{
              res.rows.forEach((i,v)=>{
                if (item.id == i.dtlid) {
                  item.attAdd.push({
                    url: i.paththumb.replace('_thumb', ''),
                    isImage: true,
                    paththumb: i.paththumb,
                    sizekb: i.sizekb,
                    sizewh: i.sizewh,
                    tp: i.tp,
                    name: i.name,
                    dtlid: i.dtlid
                  })
                }
              })
            })
            that.setData({
              orderList: that.data.orderList
            })
          }
        })
      }
    })

  },
  accnoChange: function(event) {
    this.setData({
      accno: event.detail
    })
  },
  platenoChange: function(event) {
    this.setData({
      plateno: event.detail
    })
  },
  carmodelChange: function(event) {
    this.setData({
      carmodel: event.detail
    })
  },
  garlxrChange: function(event) {
    this.setData({
      garlxr: event.detail
    })
  },
  gartelChange: function(event) {
    this.setData({
      gartel: event.detail
    })
  },
  memoChange: function(event) {
    this.setData({
      memo: event.detail
    })
  },
  storage: function() {
    let that = this;
    let arr = [];
    that.data.orderList.forEach((item, index) => {
      item.attAdd.forEach((a, d) => {
        arr.push(a);
      })
    })
    let params = {
      isSubmit: false,
      checkSdt: "2020-01-10",
      act: that.data.act,
      mst: {
        id: that.data.id,
        accno: that.data.accno,
        carmodel: that.data.carmodel,
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
        srv: that.data.srv,
        srvid: that.data.srvid,
        srvopr: that.data.mopr,
        status: "已暂存",
        yydt: that.data.startT
      },
      dtlAdd: that.data.updStatus == '修改' ? that.data.updOrderList : that.data.orderList,
      dtlUpd: that.data.dtlUpd,
      dtlDel: [],
      attAdd: arr,
      attUpd: [],
      attDel: []
    }
    
    app.sendRequest({
      action: 'saveOrder',
      params: {
        rows: JSON.stringify(params)
      },
      success: function(res) {
        if (that.data.act == 'upd') {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          wx.navigateBack({
            delta: 1, // 返回上一级页面。
            success: function() {
              prevPage.getDetail(that.data.detailTypeid); // 执行前一个页面的getList方法
            }
          })
          return;
        }
        wx.redirectTo({
          url: '../list/index'
        })
      }
    })
  },
  submits: function() {
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

    if (this.data.startT == '') {
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
      subShow: true
    })
  },
  checkByAccnoPlateno:function(){
    let that = this;
    app.sendRequest({
      action: 'checkByAccnoPlateno',
      params: {
        id: that.data.id,
        insurid: that.data.insurid,
        srvid: that.data.srvid,
        accno: that.data.accno,
        plateno: that.data.plateno,
        checkSdt: that.data.checkSdt,
        usePaging: false,
        openid:'',
        nickname:'',
        ver: 200
      },
      success: function (res) {
        that.subOrder();
      }
    })
  },
  subOrder: function() {
    let that = this;
    let arr = [];
    that.data.orderList.forEach((item, index) => {
      item.attAdd.forEach((a, d) => {
        arr.push(a);
      })
    })
    let params = {
      isSubmit: true,
      checkSdt: "2020-01-10",
      act: that.data.act,
      mst: {
        id: that.data.id,
        accno: that.data.accno,
        carmodel: that.data.carmodel,
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
        srv: that.data.srv,
        srvid: that.data.srvid,
        srvopr: that.data.mopr,
        status: "提交",
        yydt: that.data.startT
      },
      dtlAdd: that.data.orderList,
      dtlUpd: [],
      dtlDel: [],
      attAdd: arr,
      attUpd: [],
      attDel: []
    }
    app.sendRequest({
      action: 'saveOrder',
      params: {
        rows: JSON.stringify(params)
      },
      success: function(res) {
        wx.redirectTo({
          url: '../list/index'
        })
      }
    })
    this.setData({
      subShow: false
    })
  },
  delOrder: function() {
    this.setData({
      subShow: false
    })
  },
  getLoginInfo: function(e) {
    let that = this;
    app.sendRequest({
      action: 'getLoginInfo',
      params: {},
      success: function(res) {
        console.log(res, 8888)
        let ddvars = JSON.parse(res.rows.ddvars);
        console.log(ddvars, 999)
        that.setData({
          srv: ddvars.branch.shortname,
          srvid: ddvars.branch.id,
          mopr: ddvars.mopr
        })
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

  },
  compressImage({
    filePath,
    success,
    fail
  }) {
    // 获取图片宽高
    wx.getImageInfo({
      src: filePath,
      success: ({
        width,
        height
      }) => {
        const systemInfo = wx.getSystemInfoSync();
        const canvasWidth = systemInfo.screenWidth;
        const canvasHeight = systemInfo.screenHeight;
        // 更新画布尺寸
        this.setData({
          canvasWidth,
          canvasHeight
        })

        // 计算缩放比例
        const scaleX = canvasWidth / width;
        const scaleY = canvasHeight / height;
        const scale = Math.min(scaleX, scaleY);
        const imageWidth = width * scale;
        const imageHeight = height * scale;

        // 将缩放后的图片绘制到画布
        const ctx = wx.createCanvasContext("hidden-canvas");
        let dx = (canvasWidth - imageWidth) / 2;
        let dy = (canvasHeight - imageHeight) / 2;
        ctx.drawImage(filePath, dx, dy, imageWidth, imageHeight);
        ctx.draw(false, () => {
          // 导出压缩后的图片到临时文件
          wx.canvasToTempFilePath({
            canvasId: "hidden-canvas",
            width: canvasWidth,
            height: canvasHeight,
            destWidth: canvasWidth,
            destHeight: canvasHeight,
            fileType: "jpg",
            quality: 0.92,
            success: ({
              tempFilePath
            }) => {
              // 隐藏画布
              this.setData({
                canvasWidth: 0,
                canvasHeight: 0
              })

              // 压缩完成
              success({
                tempFilePath
              });
            },
            fail: error => {
              // 隐藏画布
              this.setData({
                canvasWidth: 0,
                canvasHeight: 0
              })
              fail(error);
            }
          });
        });
      },
      fail: error => {
        fail(error);
      }
    });
  }

})