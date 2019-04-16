var whenReady = (function() {
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
        recalc = function() {
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
    win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        ifHp();
    }, false);
}
whenReady(setResize);

//预加载
$(function() {
    if (!$.isWeiXin()) {
        //document.write('请用微信浏览器打开');
    };
    var imgs = [];
    $.preloadimg(imgs, function() {
        $("#loading").delay(500).fadeOut(300, function() {
            $('#container').addClass('active');
        });
    });
});

$.extend({
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
    },
    preloadimg: function(arr, comp) {
        var flag = true,
            n = 0;
        var loadImg = function(src) {
            var img = new Image();
            img.onload = function() {
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
        if (typeof(arr) == "string") {
            var l = 1;
            var w = new loadImg(arr);
        } else {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var w = new loadImg("./dist/images/" + arr[i]);
            }
        }
    }
})


