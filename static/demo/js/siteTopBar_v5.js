/*
 * @author: zhangch
 * @date: 2017-3-3
 */
var nav = function(option) {
    var _this = this;
    _this.option = $.extend({ shortCutUrl: 'site/shortCut' }, option);
    var hideTopLoginFormTimer = null;
    var hideMoreFunctionTimer = null;
    var hideCollectFunctionTimer = null;
    this.init = function() {
        $('#topLogout').click(_this.logout);
        _this.initAdImg();
        $('#collectBox').mouseenter(function() {
            _this.createCollect();
            $('#collectList').addClass('hover')
        }).mouseleave(function() {
            $('#collectList').removeClass('hover')
        });
        $('#toploginlink').click(function() {
            com_login.showLogin('', 'login');
        });
        $('#topreglink').click(function() {
            com_login.showLogin('', 'reg');
        });
        _this.initUserStatus();
        hearder.init();
        $('#setHomePage').click(function() {
            var title = _this.option.siteTitle,
                url = _this.option.siteUrl;
            if (jQuery.browser.msie) {
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(window.location.href);
            } else if (jQuery.browser.safari) {
                window.sidebar.addPanel(title, url, '');
            } else {
                alert('您的浏览器禁止此操作');
            }
            return false;
        });
        var date = new Date();
    };
    this.initAdImg = function() {
        if (typeof(window.headUrls) == 'undefined') window.headUrls = [];
        $.getJSON('//www.youzu.com/site/newSiteTopBarImg?callback=?', function(data) {
            if (data) {

                $('#game_dt_ad_min > img').attr({ 'src': data.min_img, 'alt': data.min_title });
                $('#game_dt_ad_min > a').attr({ 'href': data.max_url });
                //追加素材属性
                if ($('#game_dt_ad_min > a').attr("data-gameid") == undefined || $('#game_dt_ad_min > a').attr("data-gameid") == '' || $('#game_dt_ad_min > a').attr("data-gameid") == "") {
                    $('#game_dt_ad_min > a').attr({ 'custom': "bigeye_id:" + data.max_id });
                } else {
                    $('#game_dt_ad_min > a').attr({ 'custom': "game_id:" + $('#game_dt_ad_min > a').attr("data-gameid") + "|bigeye_id:" + data.max_id });
                }
                $('#game_dt_ad_min > a > img').attr({ 'src': data.max_img, 'alt': data.max_title });
            }
        });
    };
    this.loginSuccessFun = function() { //登录成功回调函数
        if ($.cookie('uuzu_realname')) {
            var type = $.cookie('uuzu_realname');
            if (type == 0) {
                $("#linkRelName").show();
            } else {
                $("#linkRelName").hide();
            }
        } else if ($.cookie('uuzu_UNICKNAME')) {
            $.getJSON('//www.youzu.com/site/GetRealName?callback=?', { account: $.cookie('uuzu_UNICKNAME') }, function(data) {
                if (data.code == 1) {
                    var Days = 30;
                    var exp = new Date();
                    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                    $.cookie('uuzu_realname', data.data.is_auth, { path: '/', expires: exp, domain: 'youzu.com' });
                    if (data.data.is_auth == 0) {
                        $("#linkRelName").show();
                    } else {
                        $("#linkRelName").hide();
                    }
                } else {
                    $("#linkRelName").show();
                    $.cookie('uuzu_realname', 0, { path: '/', expires: -1, domain: 'youzu.com' });
                }
            });
        }

    };
    this.initUserStatus = function() {
        if ($.cookie('uuzu_UNICKNAME')) {
            $('#toploginForm').hide();
            $('#toplogoutForm').show();
            var nickname = $.cookie('uuzu_UNICKNAME');
            if (nickname.length > 10) {
                nickname = nickname.substring(0, 10) + '..';
            }
            $('#toplogoutForm').find('.comNickname').html(nickname);
            _this.changeTimer();
            this.loginSuccessFun();
        } else {
            $('#toplogoutForm').hide();
            $('#toploginForm').show();
        }
    };
    this.logout = function() {
        $.cookie('uuzu_UNICKNAME', null, { path: '/', expires: -1, domain: 'youzu.com' });
        $.cookie('uuzu_UAUTH', null, { path: '/', expires: -1, domain: 'youzu.com' });
        _this.logoutSuccessFun();
        // var _url = 'http://passport.uuzu.com/site/delKuaYu';
        // var _src = '<script src="'+_url+'"></script>';
        // $('body').append(_src);
        if (typeof(_this.option) != 'undefined' && typeof(_this.option.logoutCallBack) == 'function') _this.option.logoutCallBack();
        _this.initUserStatus();
    };
    this.logoutSuccessFun = function() {
        $.cookie('uuzu_realname', null, { path: '/', expires: -1, domain: 'youzu.com' });
        $("#linkRelName").hide();
    };
    this.changeTimer = function(url) {
        if ($.cookie('uuzu_UAUTH') == null) {
            $.cookie('uuzu_TIMER', null, { path: '/', expires: -1, domain: 'youzu.com' });
            return null;
        } else {
            var date = new Date(),
                time = date.getTime();
            $.getJSON(_this.option.timerUrl + '?callback=?', function(data) {
                $.cookie('uuzu_TIMER', data.time_temp, { path: '/', expires: 0, domain: 'youzu.com' });
            });
        }
    }
    this.createCollect = function() {
        var str = '';
        str += '<li><a href="javascript:;" class="icon1" id="setHomePage">设为首页</a></li>' +
            '<li><a href="javascript:;" class="icon2" id="addFav">收藏本站</a></li>' +
            '<li><a href="' + _this.option.shortCutUrl + '" class="icon3">放于桌面</a></li>';
        $('#scListContent').html(str);
        $('#setHomePage').click(function() {
            if (document.all) { // 设置IE 
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(document.URL);
            } else {
                alert('设置首页失败，请手动设置！');
            }
        });
        $('#addFav').click(function() {
            var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
            var homepage = location.href;
            var sitename = location.host;
            try {
                window.external.addFavorite(homepage, sitename);
            } catch (e) {
                try {
                    window.sidebar.addPanel(sitename, homepage, '');
                } catch (e) {
                    alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
                }
            }
        });
    }
};


var hearder = function() {
    var e = {
            topGame: function() {
                var e = $('.game-topGame')
                e.mouseenter(function() {
                    e.css('height', '450px');
                    e.find('.top-gameBox').addClass('open');
                }).mouseleave(function() {
                    e.css('height', '52px');
                    e.find('.top-gameBox').removeClass('open');
                });
            },
            topAD: function() {
                var e = $('.game-gameAD');
                e.mouseenter(function() {
                    $('.u-gameAD-small').hide();
                    $('.u-gameAD-big').show();
                }).mouseleave(function() {
                    $('.u-gameAD-big').hide();
                    $('.u-gameAD-small').show();
                });
            }
        },
        t = function() {
            e.topGame(), e.topAD()
        };
    return {
        fn: e,
        init: t
    }
}();

var options = { "title": "36\u8ba12", "url": "\/\/36.youzu.com\/", "loginUrl": "http:\/\/auth.youzu.com\/user\/login", "timerUrl": "https:\/\/home.youzu.com\/user\/user-info", "shortCutUrl": "site\/shortCut" };
options.logoutCallBack = function() { window.location.reload(); };
options.loginCallBack = "";
objNav = new nav(options);
objNav.init();