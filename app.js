//app.js
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
  globalData: {
    userInfo: null,
    serverUrl: 'http://kld.8866.org:8088/dingdong/mobile',
    kldkey: '5633838366032366735303566353562626169353162693439333364616031356323333237393632373335313'
  },
  sendRequest: function(options) {
    var self = this;
    var kldkey = self.globalData['kldkey'] || '';
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
        if (xhr.statusCode == 200) {
          if (options.success) {
            if (xhr.data.success) {
              options.success.call(this, xhr.data, xhr);
            } else {
              if (xhr.data.NeedLogin) {
                wx.showToast({
                  title: '需要登陆',
                  icon: 'fail',
                  duration: 2000
                });
              } else {
                if (options.error) {
                  //options.error.call(this, xhr.responseJSON.message, xhr);
                } else {
                  if (xhr.data.message) {
                    wx.showToast({
                      title: xhr.data.message,
                      icon: 'fail',
                      duration: 2000
                    });
                  } else {
                    wx.showToast({
                      title: '服务端错误',
                      icon: 'fail',
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
              icon: 'fail',
              duration: 2000
            });
          }
        }
      }
    });
  }

})