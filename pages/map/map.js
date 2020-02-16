const app = getApp();

Page({
  data: {
    latitude: 30.240243,
    longitude: 121.263275,
    markers: [],
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
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  getOrderDistribution:function(){
    var that = this;
    app.sendRequest({
      action: 'getOrderDistribution',
      params: {
        months: -2
      },
      success: function (res) {
        if (res.success === true) {
          var rows = res.rows;
          var markers = [];
          for (var i = 0; i < rows.length; i++) {
            var m = {
              id: rows[i].garageid,
              latitude: rows[i].lat,
              longitude: rows[i].lng,
              name: rows[i].garage,
              cnt: rows[i].C_cnt,
              locateaddr: rows[i].locateaddr,
              status: rows[i].status,
              label: {
                content: rows[i].garage,  //文本
                color: '#0F0F0F',  //文本颜色
                borderRadius: 3,  //边框圆角
                borderWidth: 1,  //边框宽度
                borderColor: '#FF0202',  //边框颜色
                bgColor: '#ffffff',  //背景色
                padding: 5,  //文本边缘留白
                textAlign: 'left'  //文本对齐方式。有效值: left, right, center
              },
              callout: {
                content: rows[i].locateaddr,  //文本
                color: '#0F0F0F',  //文本颜色
                borderRadius: 3,  //边框圆角
                borderWidth: 1,  //边框宽度
                borderColor: '#0F0F0F',  //边框颜色
                bgColor: '#ffffff',  //背景色
                padding: 5,  //文本边缘留白
                textAlign: 'left'  //文本对齐方式。有效值: left, right, center
              }
            };
            markers.push(m);
          }
          that.setData({
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            markers: markers
          });
        } else {

        }
      }
    });
  },
  callouttap:function(e){
    console.log(e);
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
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
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
  }
})