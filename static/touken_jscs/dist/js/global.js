
  var wxAppId,wxTimestamp,wxNonceStr,wxSignature,openid,nickname;
    
  function callbackFun(response){
      if(response.code ==100){
          wxAppId = response.data.appId;
          wxTimestamp = response.data.timestamp;
          wxNonceStr = response.data.nonceStr;
          wxSignature = response.data.signature;
          // 通过config接口注入权限验证配置
          wx.config({
              debug: false,	// 本地开发为true，上线后改为false
              appId: wxAppId,
              timestamp:wxTimestamp,
              nonceStr: wxNonceStr,
              signature:wxSignature,
              jsApiList: [
                  'checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'hideMenuItems',
                  'showMenuItems',
                  'hideAllNonBaseMenuItem',
                  'showAllNonBaseMenuItem',
                  'translateVoice',
                  'startRecord',
                  'stopRecord',
                  'onRecordEnd',
                  'playVoice',
                  'pauseVoice',
                  'stopVoice',
                  'uploadVoice',
                  'downloadVoice',
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'getNetworkType',
                  'openLocation',
                  'getLocation',
                  'hideOptionMenu',
                  'showOptionMenu',
                  'closeWindow',
                  'scanQRCode',
                  'chooseWXPay',
                  'openProductSpecificView',
                  'addCard',
                  'chooseCard',
                  'openCard'
              ]
          });

          // 通过ready接口处理成功验证
          wx.ready(function(){

              // 分享给朋友
              wx.onMenuShareAppMessage({
                  title: '今日与我相性最适的刀剑竟然是…？',	// 分享标题
                  desc: '今日与我相性最适的刀剑竟然是…？',	// 分享描述
                  link: "http://hd.youzu.com/touken_jscs/index", // 分享链接
                  imgUrl: 'http://pic.youzu.com/apps/touken_jscs/web/share.png',	// 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                      //alert("喵喵感谢你！");

                  },
                  cancel: function () {
                      //alert("2");
                      // 用户取消分享后执行的回调函数

                  }
              });

              // 分享到朋友圈
              wx.onMenuShareTimeline({
                  title: '今日与我相性最适的刀剑竟然是…？',	// 分享标题
                  desc: '今日与我相性最适的刀剑竟然是…？',	// 分享描述
                  link: "http://hd.youzu.com/touken_jscs/index", // 分享链接
                  imgUrl: 'http://pic.youzu.com/apps/touken_jscs/web/share.png',	// 分享图标
                  success: function () {
                      // 用户确认分享后执行的回调函数
                      // alert("喵喵感谢你！");

                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数

                  }
              });

          });

          // 通过error接口处理失败验证
          wx.error(function(res){
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });

      }else {
          console.log(response.msg);
      }
  }
  
  function shareSuccess(){
      $.ajax({
          url:'http://apps.youzu.com/apps-17/share-success',
          type:'get',
          dataType:'jsonp',
          jsonpCallback:"callbackFun",
          data:{
              access_token:localStorage.token

          },
          success:function(res){
             alert("分享成功")
          }

      })
  }
  // 微信分享
  function weChatShare() {
      var burl = window.location.href;
      var result = encodeURIComponent(burl);
      $.ajax({
          url:'http://apps.youzu.com/wx_transfer/default/share',
          type:'get',
          dataType:'jsonp',
          jsonp: "callbackFun",
          jsonpCallback:"callbackFun",
          data:{burl:result},
          success:function(response){
              if(response.code ==100){
                  wxAppId = response.data.appId;
                  wxTimestamp = response.data.timestamp;
                  wxNonceStr = response.data.nonceStr;
                  wxSignature = response.data.signature;
                  // 通过config接口注入权限验证配置
                  wx.config({
                      debug: false,	// 本地开发为true，上线后改为false
                      appId: wxAppId,
                      timestamp:wxTimestamp,
                      nonceStr: wxNonceStr,
                      signature:wxSignature,
                      jsApiList: [
                          'checkJsApi',
                          'onMenuShareTimeline',
                          'onMenuShareAppMessage',
                          'onMenuShareQQ',
                          'onMenuShareWeibo',
                          'hideMenuItems',
                          'showMenuItems',
                          'hideAllNonBaseMenuItem',
                          'showAllNonBaseMenuItem',
                          'translateVoice',
                          'startRecord',
                          'stopRecord',
                          'onRecordEnd',
                          'playVoice',
                          'pauseVoice',
                          'stopVoice',
                          'uploadVoice',
                          'downloadVoice',
                          'chooseImage',
                          'previewImage',
                          'uploadImage',
                          'downloadImage',
                          'getNetworkType',
                          'openLocation',
                          'getLocation',
                          'hideOptionMenu',
                          'showOptionMenu',
                          'closeWindow',
                          'scanQRCode',
                          'chooseWXPay',
                          'openProductSpecificView',
                          'addCard',
                          'chooseCard',
                          'openCard'
                      ]
                  });

                  // 通过ready接口处理成功验证
                  wx.ready(function(){

                      // 分享给朋友
                      wx.onMenuShareAppMessage({
                          title: '今日与我相性最适的刀剑竟然是…？',	// 分享标题
                          desc: '今日与我相性最适的刀剑竟然是…？',	// 分享描述
                          link: "http://hd.youzu.com/touken_jscs/index", // 分享链接
                          imgUrl: 'http://pic.youzu.com/apps/touken_jscs/web/share.png',	// 分享图标
                          success: function () {
                              // 用户确认分享后执行的回调函数
                              //alert("喵喵感谢你！");
                              shareSuccess();

                          },
                          cancel: function () {
                              //alert("2");
                              // 用户取消分享后执行的回调函数

                          }
                      });

                      // 分享到朋友圈
                      wx.onMenuShareTimeline({
                          title: '今日与我相性最适的刀剑竟然是…？',	// 分享标题
                          desc: '今日与我相性最适的刀剑竟然是…？',	// 分享描述
                          link: "http://hd.youzu.com/touken_jscs/index", // 分享链接
                          imgUrl: 'http://pic.youzu.com/apps/touken_jscs/web/share.png',	// 分享图标
                          success: function () {
                              // 用户确认分享后执行的回调函数
                              // alert("喵喵感谢你！");
                              shareSuccess();

                          },
                          cancel: function () {
                              // 用户取消分享后执行的回调函数

                          }
                      });

                  });

                  // 通过error接口处理失败验证
                  wx.error(function(res){
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                  });

              }else {
                  console.log(response.msg);
              }

          },
          error:function (err) {
              console.log(err);
          }
      });
  }
  weChatShare();
$('.close').click(function(){
    $('.mask').hide();
  $(this).parents('.libao-pop').hide();
});
$('.detail').click(function(){
    $('.mask').show();
    $('.libao-pop.daojian-introduce').show();
});

$('.btn.share').click(function(){
    $('.mask').show();
    $('.libao-pop.share').show();
})

$('.start-btn').click(function(){
    console.log("hjkasdjlfkdjsg")
    var name=$.trim($('.input-name').val());
    if(name==""){
          alert("请输入你的名字！！")
    }
    else{
        $.ajax({
            url:'http://apps.youzu.com/apps-17/test',
            type:'get',
            dataType:"jsonp",
            data:{
                name:name
            },
            jsonpCallback:"localJsonpCallback",
            success:function(response){
                
               if(response.status==1){
                   console.log("response",JSON.stringify(response));
                   
                    localStorage.setItem('DaoNan',JSON.stringify(response));
                    window.location.href="detail.html";
               }
               else{
                   alert(response.msg);
               }
               
              
            },
        })
    }
});

$('.mine-btn').click(function(){
    $.ajax({
        url:'http://apps.youzu.com/apps-17/open-gift',
        type:'get',
        dataType:"jsonp",
        data:{
            access_token:localStorage.token
        },
        jsonpCallback:"localJsonpCallback",
        success:function(res){
            if(res.status==1){
               
                $('.libao-pop.done').show();
                $('p.libaoma').text(res.data.code);
             
              
            }else if(res.status==-1){
                $('.libao-pop.todo').show();
                $('.mask').show();
            }
            else{
                window.location.href = 'http://apps.youzu.com/apps-17/login?backUrl=http://hd.youzu.com/touken_jscs/index';

            }
        
           
          
        },
    })
  
});

$('.sure-btn').click(function(){
    $(this).parents('.libao-pop').hide();
    $('.mask').hide();
});



function localJsonpCallback(){
    console.log("json")
}

// function getMobileOperatingSystem() {
//     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
//         // Windows Phone must come first because its UA also contains "Android"
//       if (/windows phone/i.test(userAgent)) {
//           return "Windows Phone";
//       }
  
//       if (/android/i.test(userAgent)) {
//           return "Android";
//       }
  
//       // iOS detection from: http://stackoverflow.com/a/9039885/177710
//       if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//           return "iOS";
//       }
  
//       return "unknown";
//   }

