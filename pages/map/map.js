Page({
  data: {
    latitude: 29.28946,
    longitude: 120.24191,
    markers: [],
    map:false
  },
  onReady: function (e) {
    //创建 map 上下文 MapContext 对象。
    this.mapCtx = wx.createMapContext('myMap');
    
  },
  onLoad: function (options) {
    var that = this;
    
    that.setData({
      latitude: 29.28946,
      longitude: 120.24191,
      markers: [{
        id: 1,
        latitude: 29.28946,
        longitude: 120.24191,
        name: '腾讯\naass'
      }],
      map: false
    });
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