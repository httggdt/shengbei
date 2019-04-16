var imgPlayer = function(options) {
    var _this = this;
    this.control = true;
    this.imgLength = 0;
    this.imgOffset = 0;
    this.imgObj = new Object;

    var settings = {
        img_obj: $("#wallpaperList a[data-imgSrc]"),
        btn_prev: "#pop_tuku_bar .to-prev",
        btn_next: "#pop_tuku_bar .to-next",
        pop_obj: "#pop_tuku_bar",
        pop_img: "#pop_tuku_bar .pt_pics img:eq(0)",
        pop_title: "#pop_tuku_bar .pt_nms span",
        pop_show_div: "div.tuku_left",
        pop_html: '',
        pop_download: false
    };

    if (options) {
        $.extend(settings, options);
    }

    // 初始化操作
    this.init = function() {
        this.imgObj = settings.img_obj;
        this.imgLength = settings.img_obj.length;
        this.imgObj.unbind("click").bind("click", function() {
            var title = $(this).attr("title");
            var img = $(this).attr("data-imgSrc");
            var downHtml = '';
            if (settings.pop_download) {
                downHtml = '<a href="/site/downloadImg?src=' + encodeURI(img) + '&title=' + title + '" class="btn_down">下载</a>'
            }
            var html = settings.pop_html;
            if (!html) {
                html = '<div class="pop_tuku_bar" id="pop_tuku_bar" style="width: 850px;height: 450px;overflow: hidden;">\
                        <div class="loadingDiv" style="position:absolute; display:none; top:0px; text-align:center; z-index:1000001; left:0px; background-color:#000;">\
                            <img src="http://pic.youzu.com/sg/images/loading.gif?01" style="position:absolute;">\
                        </div>\
                        <div class="tuku_left">\
                          <p class="pt_pics"><img src="' + img + '" alt="' + title + '" /></p>\
                          <p class="pt_nms"><span class="pt_nmtxt">' + title + '</span>' + downHtml + '</p>\
                          <p class="pt_lin"><span class="ot_a"><a href="javascript:;" class="to-prev">< 上一张</a></span><span class="ot_jie">|</span><span class="ot_b"><a href="javascript:;" class="to-next">下一张 ></a></span></p>\
                        </div>\
                        <div class="tuku_right"><a href="javascript:;" class="btn_tan_close">close</a></div>\
                    </div>';
            }

            pop.show(html, '.btn_tan_close');
            _this.imgOffset = $(this).parents("span").index();
            $(settings.btn_next).unbind("click").bind("click", function() {
                _this.toNext();
            });
            $(settings.btn_prev).unbind("click").bind("click", function() {
                _this.toPrev();
            });
            $(settings.pop_img).unbind("click").bind("click", function() {
                _this.toNext();
            });

            _this.loading();
            return false;
        });
    };
    // 上一张
    this.toPrev = function() {
        if (!this.control) {
            return;
        }
        this.control = false;

        var nextId = this.imgOffset - 1 >= 0 ? this.imgOffset - 1 : this.imgLength - 1;
        this.imgOffset = nextId;

        $(settings.pop_img).attr("src", this.imgObj.eq(nextId).attr("data-imgSrc"));
        $(settings.pop_title).html(this.imgObj.eq(nextId).attr("title"));
        this.loading();
        this.control = true;
    };

    // 下一张
    this.toNext = function() {
        if (!this.control) {
            return;
        }
        this.control = false;


        var nextId = this.imgOffset + 1 >= this.imgLength ? 0 : this.imgOffset + 1;

        this.imgOffset = nextId;

        $(settings.pop_img).attr("src", this.imgObj.eq(nextId).attr("data-imgSrc"));
        $(settings.pop_title).html(this.imgObj.eq(nextId).attr("title"));
        this.loading();
        this.control = true;
    };

    // 加载
    this.loading = function() {
        var _w = 76,
            _h = 35;
        var popObj = $(settings.pop_obj),
            h = popObj.height(),
            w = popObj.width() - _w;
        popObj.children(".loadingDiv").css({ "height": h + "px", "width": w + "px", "top": "0px" }).fadeIn(0);
        popObj.find(".loadingDiv img").css({ "top": ((h - _h) / 2) + "px", "left": ((w - _w) / 2) + "px" });

        $(settings.pop_img).unbind("load").load(function() {
            $(this).removeAttr("style");
            var winH = $(window).height(),
                winW = $(window).width(),
                maxH = winH * 0.8,
                maxW = winW * 0.8,
                imgH = $(this).height(),
                imgW = $(this).width();

            if (imgH > maxH) {
                imgW = imgW * maxH / imgH;
                imgH = maxH;
            }
            if (imgW > maxW) {
                imgH = imgH * maxW / imgW;
                imgW = maxW;
            }
            var pLeft = $(document).scrollLeft() + (winW - imgW) / 2,
                Height = $(window).innerHeight - imgH;
            //console.info(Height);
            pTop = (winH - imgH) / 2;
            $(this).css({ "width": imgW + "px", "height": imgH + "px" });
            popObj.find(settings.pop_show_div).hide();

            //console.info(pTop);


            popObj.animate({
                "top": pTop + "px",
                "left": pLeft + "px",
                "width": (imgW + _w) + "px",
                "height": (imgH + _h) + "px"
            }, 500);
            //console.log(popObj);
            popObj.find(".loadingDiv img").animate({ "top": (imgH / 2) + "px", "left": ((imgW - _w) / 2) + "px" }, 500);
            //console.log(popObj.find(".loadingDiv img"));console.log(popObj.html());
            popObj.children(".loadingDiv").animate({
                "width": imgW + "px",
                "height": (imgH + _h) + "px"
            }, 500, function() {
                ////////////////////$(this).slideToggle(1000);
                $(this).animate({ "height": "0px", "top": (imgH + _h) + "px" }, 900);
                popObj.find(settings.pop_show_div).css({ "width": imgW + "px", "height": (imgH + _h) + "px" }).show();
            });
            //console.log(popObj.children(".loadingDiv"));console.log(popObj.html());
        });
    }
};

function OpenVideo(url, title) {
    if (!url) {
        url = "/images/video/videoTop.mp4";
    }
    var video;
    if (checkVideo()) {
        video = '<video src="' + url + '" width="800" height="450" autoplay="autoplay" preload="none" controls="controls" style=" background-color:#000;"></video>';
    } else {
        video = '<object class="shipinbo" width="800"  height="450" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase=" http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0">\
            <param value="//pic.youzu.com/youzu_cn/images/flash/mediaplayer.swf?file=' + url + '&amp;autostart=false&amp;t=1493274766744&amp;height=450" name="movie">\
            <param value="high" name="quality">\
            <param value="true" name="allowFullScreen">\
            <param value="transparent" name="wmode">\
            <embed width="800" height="450" allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="//pic.youzu.com/youzu_cn/images/flash/mediaplayer.swf?file=' + url + '&amp;autostart=false&amp;t=1493274766744&amp;height=450">\
          </object>';
        video = '<embed src="' + url + '" allowFullScreen="true" quality="high" width="100%" height="418" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"></embed>';
    }
    var html = '' +
        '<div class="pop_video_bar" style="width: 876px; height:450px;display: block; position: fixed; left: 513.5px; top: 30%; z-index: 1000000;">' +
        '<div class="video_left" style="width: 800px;height:450px;text-align:center; z-index:-1000001;"><p class="pt_videos">' + video + '</p></div><div class="tuku_right"><a href="javascript:;" class="btn_tan_close">close</a></div></div>';
    pop.show(html, '.btn_tan_close');
    /*解决视频弹窗遮罩层不能完全遮盖事件*/
    $("#backgroundBoardId").css('position', 'fixed');
    $(".pop_video_bar").css('position', 'fixed');
    ChangeHeight();
}
$(window).scroll(function() {
    ChangeHeight();
})

function ChangeHeight() {
    cssHeight = parseInt($("#pop_tuku_bar").css("height"))
    if (cssHeight != NaN) {
        Height = window.innerHeight - cssHeight;
    } else {
        cssHeight = parseInt($("#pop_video_bar").css("height"))
    }
    if (!Height) {
        Height = window.innerHeight - 450;
    }
    if (Height != NaN) {
        Height = Height / 2;
        $(".pop_video_bar").css("top", Height + "px");
        $("#pop_tuku_bar").css("top", Height + "px");
        $(".pop_tuku_bar").css("top", Height + "px");
    }
}


function checkVideo() {
    if (!!document.createElement('video').canPlayType) {
        var vidTest = document.createElement("video");
        oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
        if (!oggTest) {
            h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            if (!h264Test) {
                return false;
            } else {
                if (h264Test == "probably") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if (oggTest == "probably") {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

var pop = {
    prompt: new prompt(),

    show: function(html, close_btn, close_func) {
        this.prompt.init(html, function(o) {
            o.container.find(close_btn).click(function() {
                if (close_func && typeof close_func == 'function') {
                    close_func();
                    o.container.remove();
                    background().remove();
                    return false;
                } else {
                    o.container.remove();
                    background().remove();
                    return false;
                }
            });
        }).show();
    },

    close: function() {
        this.prompt.remove();
        background().remove();
    }
};

function background(o) {
    var o = o || {},
        zIndex = o.zindex || 999999,
        width = Math.max(document.body.clientWidth || document.documentElement.clientWidth) + 'px',
        height = Math.max(document.body.clientHeight || document.documentElement.clientHeight) + 'px',
        iframe = !jQuery('#backgroundBoardId').length ? jQuery('<iframe id="backgroundBoardId" scrolling="no" frameborder="0" \
                    style="overflow:hidden; \
                        position:absolute; \
                        background:#000; \
                        z-index:' + zIndex + '; \
                        width:' + width + '; \
                        left:0; \
                        top:0; \
                        height:' + height + '; \
                        display:none" src="http://pic.youzu.com/one/js/bck.htm"></iframe>').appendTo(document.body || document.documentElement).css('opacity', (o.opacity || .7)) :
        jQuery('#backgroundBoardId').css({ width: width, height: height });
    return iframe;
}

// 弹窗
function prompt(win) {
    var _this = this;
    this.win = win || window;
    this.init = function(content, callback) {
        // 开始初始化
        if (!content) {
            throw new Error('Argument is invalid');
        }
        this.callback = callback;
        var content = content,
            getTop = this.win.document.body || this.win.documentElement,
            // 获取容器
            container = typeof content == 'string' ? jQuery(content).hide().appendTo(getTop) :
            (content instanceof jQuery ? content : jQuery(content)).clone(true).hide().appendTo(getTop);
        // 检测容器是否存在。
        if (!container.length) {
            throw new Error('Empty object');
        }
        // 绑定给对象
        this.container = container;
        return this;
    };
    this.layout = function(callback) {
        if (!this.container) {
            throw new Error('Must be init');
        }
        typeof callback === "function" && callback(this);
        return this;
    };
    this.show = function() {
        // 布局这个浮层的位置。
        var ofs = this.getOffset();

        this.container.css({
            position: 'absolute',
            left: ofs.left,
            top: ofs.top,
            display: 'block',
            zIndex: 1000000
        });
        this.backgroundObj = background({ opacity: 0.5 }).show();
        typeof this.callback === 'function' && this.callback(this);
    };
    this.hide = function() {
        this.container.hide();
        background().hide();
    };
    this.remove = function() {
        this.container && this.container.remove();
        this.container = null;
    };

    // 获取浮动层的偏移量
    this.getOffset = function() {
        var ofs = {},
            win = jQuery(_this.win);
        ofs.docWidth = jQuery(_this.win.document.body).width();
        ofs.docHeight = jQuery(_this.win.document.body).height();
        ofs.winHeight = win.height();
        ofs.winWidth = win.width();
        ofs.conWidth = jQuery(_this.container).width();
        ofs.conHeight = jQuery(_this.container).height();

        ofs.left = Math.max(0, win.scrollLeft() + (ofs.winWidth - ofs.conWidth) / 2),
            ofs.top = Math.max(0, win.scrollTop() + (ofs.winHeight - ofs.conHeight) / 2 - 50);

        // 防止 超出底部
        ofs.top = Math.min(ofs.docHeight - ofs.conHeight - 10, ofs.top);
        return ofs;
    };

    // 监控 window 对象的 resize 事件
    jQuery(this.win).resize(function() {
        var ofs = _this.getOffset();

        jQuery(_this.backgroundObj).css({ "width": ofs.docWidth + "px", "height": ofs.docHeight + "px" });
        jQuery(_this.container).css({ "left": ofs.left + "px", "top": ofs.top + "px" });
    }).scroll(function() {
        var ofs = _this.getOffset();
        jQuery(_this.container).css({ "top": ofs.top + "px" });
    });
}