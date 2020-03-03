const app = getApp();

Page({
  data: {
    latitude: 30.240243,
    longitude: 121.263275,
    markers: [],
    showLabel:false,
    showYcnt:false,
    items: [
      { name: '显示标签', value: 'label' },
      { name: '显示预约', value: 'ycnt' },
    ]
  },
  onReady: function (e) {
    //创建 map 上下文 MapContext 对象。
    this.mapCtx = wx.createMapContext('myMap');
    
  },
  onLoad: function (options) {
    var that = this;
    that.getOrderDistribution();
  },
  //获取当前地图中心的经纬度
  getCenterLocation: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude);
        console.log(res.latitude);
        that.setData({
          latitude: res.longitude,
          longitude: res.latitude
        });
      }
    })
  },
  getOrderDistribution: function (mapCtx){
    var that = this;
    app.sendRequest({
      action: 'getOrderDistribution',
      params: {
        months: -2
      },
      success: function (res) {
        if (res.success === true) {
          var rows = res.rows;
          var cnt = 0;
          var disp = '';
          var markers = [];
          for (var i = 0; i < rows.length; i++) {
            if(!rows[i].lat){
              continue;
            }

            if (rows[i].A_cnt) { disp += ' 今日' + rows[i].A_cnt; cnt += rows[i].A_cnt; }
            if (rows[i].B_cnt) { disp += ' 今日(急)' + rows[i].B_cnt; cnt += rows[i].B_cnt; }
            if (rows[i].C_cnt) { disp += ' 逾期' + rows[i].C_cnt; cnt += rows[i].C_cnt; }
            if (rows[i].D_cnt) { disp += ' 预约' + rows[i].D_cnt; cnt += rows[i].D_cnt; }
            var m = {
              id: rows[i].garageid,
              latitude: rows[i].lat,
              longitude: rows[i].lng,
              name: rows[i].garage,
              cnt: rows[i].C_cnt,
              locateaddr: rows[i].locateaddr,
              status: rows[i].status,
              labelData: {
                content: rows[i].garage + '(' + cnt + ')',  //文本
                color: '#0F0F0F',  //文本颜色
                borderRadius: 3,  //边框圆角
                borderWidth: 1,  //边框宽度
                borderColor: '#FF0202',  //边框颜色 q
                bgColor: '#ffffff',  //背景色
                padding: 5,  //文本边缘留白
                textAlign: 'left'  //文本对齐方式。有效值: left, right, center
              },
              callout: {
                content: '单位：' + rows[i].garage 
                + '\n地址：' + rows[i].locateaddr + '\n订单：' + disp,  //文本
                color: '#0F0F0F',  //文本颜色
                borderRadius: 3,  //边框圆角
                borderWidth: 1,  //边框宽度
                borderColor: '#0F0F0F',  //边框颜色
                bgColor: '#ffffff',  //背景色
                padding: 5,  //文本边缘留白
                textAlign: 'left'  //文本对齐方式。有效值: left, right, center
              }
            };
            //m.label = m.labelData;
            if(that.data.isShowLable){
              m.label = m.labelData;
            }
            // if(that.data.isShowYcnt){

            // }
            markers.push(m);
          }
          that.setData({
            markers: markers
          });
          if(mapCtx){
            let pointData = { padding: [10] };
            let points = [];
            for(let m = 0;m<markers.length;m++){
              if (markers[m].latitude){
                points.push({
                  latitude: markers[m].latitude,
                  longitude: markers[m].longitude
                });
              }
            }
            pointData.points = points;
            if(points.length > 0){
              mapCtx.includePoints(pointData);
            }


          }
          
        }
      }
    });
  },
  callouttap:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../list/index'
    });
  },
  //将地图中心移动到当前定位点
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  //平移marker，带动画
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  //缩放视野展示所有经纬度
  includePoints: function () {
    this.getOrderDistribution(this.mapCtx);
  },
  //获取当前地图的缩放级别
  scaleClick: function () {
    this.mapCtx.getScale({
      success: function (res) {
        console.log(res.scale)
      }
    })
  },
  //获取当前地图的视野范围
  getRegionClick: function () {
    this.mapCtx.getRegion({
      success: function (res) {
        console.log(res.southwest)
        console.log(res.northeast)
      }
    })
  },
  checkboxChange:function (e){
    console.log(e);
    let that = this;
    let arr = e.detail.value;
    let isShowLable = false;
    let isShowYcnt = false;
    for(let i=0;i<arr.length;i++){
      if(arr[i] == 'label'){
        isShowLable = true;
      }
      if (arr[i] == 'ycnt'){
        isShowYcnt = true;
      }
    }

    that.setData({
      isShowLable: isShowLable,
      isShowYcnt: isShowYcnt
    });

  }
})