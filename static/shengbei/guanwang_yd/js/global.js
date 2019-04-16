var whenReady = (function () {
    //百度推送
    (function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    //百度统计打点
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?f61970e1ce8b3758b866572e28e07fba";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    var funcs = [];
    var ready = false;

    function handler(e) {
        if (ready) return;
        if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
            return;
        }
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        ready = true;
        funcs = null;
    }
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false); //IE9+
        window.addEventListener('load', handler, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }
    return function whenReady(fn) {
        if (ready) {
            fn.call(document);
        } else {
            funcs.push(fn);
        }
    }
})();

//自适应设置
function setResize() {
    var doc = document,
        win = window;
    var docEl = doc.documentElement,
        con = doc.getElementById("container"),
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = con.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            document.body.style.visibility = "visible"
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    //判断手机横竖屏状态
    function ifHp() {
        if (window.orientation === 180 || window.orientation === 0) {
            //竖屏状态
            $(".hTip").css("visibility", 'hidden');
        }
        if (window.orientation === 90 || window.orientation === -90) {
            //横屏状态
            $(".hTip").css("visibility", 'visible');
        }
    }
    ifHp();
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        ifHp();
    }, false);
}
whenReady(setResize);


// 跳转
var LowerCase = navigator.userAgent.toLowerCase();


if (LowerCase.indexOf('windows nt') === -1 && LowerCase.indexOf('macintosh') === -1) {

} else {
    window.location.href = '/';
}



//预加载
// $(function() {
//     if (!$.isWeiXin()) {
//         //document.write('请用微信浏览器打开');
//     };
//     var imgs = ["loading.gif","kv.png","pageOne.png","slogan.png"];
//     $.preloadimg(imgs, function() {
//         $("#loading").delay(500).fadeOut(300, function() {
//             $('#container').addClass('active');
//         });
//     });
// });

$.extend({
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
    },
    preloadimg: function (arr, comp) {
        var flag = true,
            n = 0;
        var loadImg = function (src) {
            var img = new Image();
            img.onload = function () {
                n++;
                var t = Math.round(n / l * 100);
                $("#loading span").text(t + "%");
                if (t >= 80 && flag) {
                    comp();
                    flag = false;
                }
            }
            img.src = src;
        }
        if (typeof (arr) == "string") {
            var l = 1;
            var w = new loadImg(arr);
        } else {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var w = new loadImg("images/" + arr[i]);
            }
        }
    }
})


$(function () {
    var swiper = new Swiper('.wutu', {
        effect: 'slide',
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true
    });



    var newsSwiper = new Swiper('#tabs-container', {
        speed: 500,
        onSlideChangeStart: function () {
            $(".newsBox .tabs .active").removeClass('active')
            $(".newsBox .tabs a").eq(newsSwiper.activeIndex).addClass('active')
        }
    })
    $(".newsBox .tabs a").on('touchstart mousedown', function (e) {
        e.preventDefault()
        $(".newsBox .tabs .active").removeClass('active')
        $(this).addClass('active')
        newsSwiper.slideTo($(this).index())
    })
    $(".newsBox .tabs a").click(function (e) {
        // e.preventDefault()
    })


    var glSwiper = new Swiper('#gl-container', {
        speed: 500,
        onSlideChangeStart: function () {
            $(".glBox .tabs .active").removeClass('active')
            $(".glBox .tabs a").eq(glSwiper.activeIndex).addClass('active')
        }
    })
    $(".glBox .tabs a").on('touchstart mousedown', function (e) {
        e.preventDefault()
        $(".glBox .tabs .active").removeClass('active')
        $(this).addClass('active')
        glSwiper.slideTo($(this).index())
    })
    $(".glBox .tabs a").click(function (e) {
        e.preventDefault()
    })

    var movieSwiper = new Swiper('#movie-container', {
        speed: 500,
        onSlideChangeStart: function () {
            $(".movieBox .tabs .active").removeClass('active')
            $(".movieBox .tabs a").eq(movieSwiper.activeIndex).addClass('active')
        }
    })
    $(".movieBox .tabs a").on('touchstart mousedown', function (e) {
        e.preventDefault()
        $(".movieBox .tabs .active").removeClass('active')
        $(this).addClass('active')
        movieSwiper.slideTo($(this).index())
    })
    $(".movieBox .tabs a").click(function (e) {
        e.preventDefault()
    })


    var innerSwiper = new Swiper('#inner-container', {
        noSwiping: true,
        width: window.innerWidth,
        onSlideChangeStart: function () {
            $(".innerBox .tabs .active").removeClass('active')
            $(".innerBox .tabs a").eq(innerSwiper.activeIndex).addClass('active')
        }
    })
    $(".innerBox .tabs a").on('touchstart mousedown', function (e) {
        // e.preventDefault()
        $(".innerBox .tabs .active").removeClass('active')
        $(this).addClass('active')
        innerSwiper.slideTo($(this).index())
    })
    $(".innerBox .tabs a").click(function (e) {
        // e.preventDefault()
    })

    $('[data-fancybox]').fancybox({
        buttons: [
            'close'
        ],
    });


    $(".filter").click(function () {
        $(".filterBox").slideToggle("fast")
    })
    $(".filterBox .item").click(function () {
        $(this).toggleClass("cur");
    })
    $(".videoItem").click(function () {
        $(".popUp_video").show();
        $("#videoX").css("opacity", 1).attr("src", $(this).data("src"));
        $("#videoX")[0].play();
    })
    $(".btn_close").click(function () {
        $(".popUp_video").hide();
        $("#videoX").css("opacity", 0);
        $("#videoX")[0].pause();
    })
    var topImg = new Swiper('#topImg-container', {
        effect: 'slide',
        loop: true,
        pagination: '.swiper-pagination2',
        paginationClickable: true
    });


    //鼠标经过显示 奖励明细
    /*		
    	$(".btn-yuejiang").click(function(event) { 
    		$(".pop_Jiang_bar").show();
    	});
    	
    	$(".jiang_level_Box .J_da").click(function(event) { 
    		$(".jiang_tips_Box p").hide().eq($(".jiang_level_Box .J_da").index(this)).show();
    	});
    	$(".jiang_tips_Box p").click(function(event) { 
    		$(this).hide();
    	});
    	
    	$(".btns_close_pop, .coverBg").click(function(event) { 
    		$(".pop_Jiang_bar").hide();
    	});
    	*/

    //鼠标经过显示 奖励明细		
    $(".btn-yuejiang").click(function (event) {
        $(".pop_Jiang_bar").show();
    });

    $(".J_da").on('touchstart', function (e) {
        $(".jiang_tips_Box p").hide().eq($(".jiang_level_Box .J_da").index(this)).show();
    })

    $(".J_da").on('touchend ', function (e) {
        $(".jiang_tips_Box p").hide();
    })

    $(".J_no").on('touchstart', function (e) {
        alert(" 敬请期待");
    })

    $(".jiang_tips_Box p").click(function (event) {
        $(this).hide();
    });

    $(".btns_close_pop, .coverBg").click(function (event) {
        $(".pop_Jiang_bar").hide();
    });








});