
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  initTime(){
    var date = new Date();
    //年
    var year = date.getFullYear();
    //月
    var month = date.getMonth() + 1;
    //日
    var day = date.getDate() + 1;
    //时
    var hh = date.getHours();
    //分
    var mm = date.getMinutes();
    //秒
    var ss = date.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var rq = year + "-" + month + "-" + day + " " + "14" + ":" + "00" + ":" + "00";
    return rq;
  },
  globalData: {
    userInfo: null,
    serverUrl: 'https://kld.bestedu.online/dingdong/mobile',
    lastMonths: -2,
    attrUrl: 'https://kld.bestedu.online/dingdong/static/upload/'
  },
  sendRequest: function(options) {
    var self = this;
    var kldkey = wx.getStorageSync('kldkey') || '';
    var serverUrl = self.globalData['serverUrl'];
    options.params = options.params || {};
    options.params.usePaging = options.params.usePaging || false;
    options.params.kldkey = kldkey;
    options.params.ver = 200;
    var tarUrl = serverUrl;
    if (options.action)
      tarUrl += "/doAction?method=" + options.action;
    else if (options.callMethod)
      tarUrl += "/" + options.callMethod;
    var contentType = options.contentType || 'application/x-www-form-urlencoded';
    wx.request({
      method: options.type || "post",
      url: tarUrl,
      data: options.params,
      header: {
        'content-type': contentType //修改此处即可
      },
      complete: function(xhr) {
        wx.hideLoading();
        if (xhr.statusCode == 200) {
          if (options.success) {
            if (xhr.data.success) {
              options.success.call(this, xhr.data, xhr);
            } else {
              if (xhr.data.NeedLogin) {
                wx.redirectTo({
                  url: '/pages/login/index'
                })
              } else {
                if (options.fail) {
                  options.fail.call(this, xhr.data, xhr);
                } else {
                  if (xhr.data.message) {
                    wx.showToast({
                      title: xhr.data.message,
                      duration: 2000
                    });
                  } else {
                    wx.showToast({
                      title: '服务端错误',
                      duration: 2000
                    });
                  }
                }
              }
            }
          }
        } else {
          var msg = xhr.errMsg;
          if (options.error) {
            options.error.call(this, msg, xhr);
          } else {
            wx.showToast({
              title: msg,
              duration: 2000
            });
          }
        }
      }
    });
  }

})