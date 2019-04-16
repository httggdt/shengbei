/**
 * 平台顶通js SDK
 * author: chenjie
 * date: 20180529
 * require : 需要事先引入 jquery, 广告统计代码 //apipool.youzu.com/sdk/yz.min.js(主要是注册函数成功后调用到了yz)
 * use : headerSDK.init('qa', 'shop', 110);  
 * @param qa 开发环境 prod 线上环境
 * @param shop 标识网站
 * @param 110  版本号
 */

var headerSDK = {
    env: '',
    staticUrl: '',
    hostname: '',
    path: '/',
    actmark: true, //是否采用活动顶通
    version: 201806192014, //静态资源版本号
    website_url: {
        'qa': '//qawww.youzu.com',
        'prod': '//www.youzu.com'
    },
    server_url: {
        'qa': '//qapic.youzu.com',
        'prod': '//pic.youzu.com'
    },
    home_apiUrl: {
        'qa': '//qahome.youzu.com',
        'prod': '//home.youzu.com'
    },
    js_list: [
        '//pic.youzu.com/common/js/xg.js?v=',
        '//pic.youzu.com/common/reg_login/js/login.js?v=',
        '//pic.youzu.com/common/jquery-1.8.3.min.js?v=',
        '//pic.youzu.com/common/jquery.cookie.js?v=',
        '//pic.youzu.com/common/reg_login/js/showPop.js?v=',
        '//pic.youzu.com/m/web/mobile/js/jQuery.md5.js?v=',
        '/demo/js/siteTopBar_v5.js?v=',
    ],
    css_list: [
        '/common/gameHead/css/gameHeader.css?v=',
        '/common/reg_login/css/denglu.css?v='
    ],
    link: {
        'qa': {
            'www': '//qawww.youzu.com/',
            'shop': '//qashop.youzu.com/',
            'pay': '//qapay.youzu.com/',
            'bbs': '//qaforum.youzu.com/',
            'user_center': '//qahome.youzu.com/',
            'service': '//qaservice.youzu.com/',
            'live': '//tv.youzu.com',
            'news': '//qawww.youzu.com/news.html',
            'pact': '//qapact.youzu.com',
            'coming': '//qawww.youzu.com/site/coming'
        },
        'prod': {
            'www': '//www.youzu.com/',
            'shop': '//shop.youzu.com/',
            'pay': '//pay.youzu.com/',
            'bbs': '//forum.youzu.com/',
            'user_center': '//home.youzu.com/',
            'service': '//service.youzu.com/',
            'live': '//tv.youzu.com',
            'news': '//www.youzu.com/news.html',
            'pact': '//qapact.youzu.com',
            'coming': '//www.youzu.com/site/coming'
        }
    },
    data_loc_id_pre: '0000',
    data_loc_conf: {
        'www': '0001',
        'pay': '0003',
        'bbs': '0005',
        'shop': '0006',
        'user_center': '0007',
        'service': '0008',
        'live': '0009',
        'pact': '0010'
        //'m.youzu.com': '0002',
        //'kf.youzu.com': '0004',
    },

    init: function(env, webmark) {
        this.env = env;
        this.webmark = webmark;
        this.data_loc_id_pre = this.data_loc_conf[webmark];
        this.hostname = this.server_url[env];
        this.staticUrl = this.hostname + this.path;
        if (env != 'prod') {
            this.env = 'qa';
            this.version = new Date().getTime();
        }

        this.run();
    },

    run: function() {
        this.createCss();
        this.createJs();
        this.getGameList();
        this.getLeftImg();
    },
    createJs: function() {
        var _this = this;
        var head = document.getElementsByTagName("head");
        var labScript = document.createElement("script");
        var lab_url = '//pic.youzu.com/youzu/web/website_header/js/labjs.min.js?' + this.version;
        $(labScript).load(function() {
            var list = headerSDK.js_list;
            for (var i = 0; i < list.length; i++) {
                switch (list[i]) {
                    case 'js/jquery.cookie.js?v=':
                        $LAB.script(headerSDK.staticUrl + list[i] + headerSDK.version).wait(function() { headerSDK.checkLogin() });
                        break;
                    case 'js/jquery-1.8.3.min.js?v=':
                        if (typeof jQuery == 'undefined') {
                            $LAB.script(headerSDK.staticUrl + list[i] + headerSDK.version);
                        }
                        break;
                    default:
                        $LAB.script(list[i] + headerSDK.version);
                }
            }

        });
        labScript.src = lab_url;
        head[0].appendChild(labScript);

    },

    createCss: function() {
        if (!this.actmark) {
            this.setHeader();
            return;
        }
        //list里面可以添加需要的css地址 不需要host部分
        var list = this.css_list;
        var head = document.getElementsByTagName("head");
        var len = list.length - 1;
        for (var i = 0; i < list.length; i++) {
            var css = document.createElement("link");
            if (len == i) {
                var _this = this;
                $(css).load(function() {
                    _this.setActHeader();
                });
            }
            var href = this.hostname + list[i] + this.version;
            css.href = href;
            css.rel = "stylesheet";
            head[0].appendChild(css);
        }
    },

    checkLogin: function() {
        if (!$.cookie('uuzu_UNICKNAME')) {
            console.log('logout');
            return
        }
        console.log('checklog');
        $.getJSON(this.home_apiUrl[this.env] + '/api/user/user-info?callback=?', function(data) {
            if (data && data.vip_info) {
                //vip等级图
                $("#topLoginVip").html('<img src="' + data.vip_info.level_icon + '" alt="">')
            }
        });
    },
    //顶通游戏列表左侧大图
    getLeftImg: function() {
        var url = this.website_url[this.env] + '/api/topleftimg';
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            success: function(data) {
                if (0 !== data.status) {
                    return;
                }
                $('.top_gugutu').attr('href', data.data.topadurl);
                $('.top_gugutu').attr('data_loc_id', headerSDK.data_loc_id_pre + '00001');
                $('.top_gugutu').attr('custom', 'game_id:' + data.data.game_id + '|bigeye_id:' + data.data.ad_id + '');
                $('.top_gugutu>img').attr('src', data.data.topadimg);
            }
        });
    },
    //顶通游戏列表
    getGameList: function() {
        var url = this.website_url[this.env] + '/api/topgamelist';
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            success: function(data) {
                if (0 !== data.status) {
                    return;
                }
                if (data.data.webgame.length > 0) {
                    var tmp = '';
                    $.each(data.data.webgame, function(i, v) {
                        if (!v.title) return;
                        var tag = '';
                        if ('N' == v.remark) {
                            tag = '<i class="iconC iconC_gact_new"></i>';
                        } else if ('H' == v.remark) {
                            tag = '<i class="iconC iconC_gact_hot"></i>';
                        }
                        tmp += '\
							<p>\
								<a target="_blank" href="' + v.url + '" data_loc_id="' + headerSDK.data_loc_id_pre + '00001" data_id="300_adId_' + v.id + '" event_type="click" >\
									<span>' + v.title + '</span>\
									' + tag + '\
								</a>\
							</p>';
                    });
                    $('.tGmlt_01>.tGmlt_xiao').html(tmp);
                }
                if (data.data.mobgame.length > 0) {
                    var tmp = '';
                    $.each(data.data.mobgame, function(i, v) {
                        if (!v.title) return;
                        var tag = '';
                        if ('N' == v.remark) {
                            tag = '<i class="iconC iconC_gact_new"></i>';
                        } else if ('H' == v.remark) {
                            tag = '<i class="iconC iconC_gact_hot"></i>';
                        }
                        tmp += '\
							<p>\
								<a target="_blank" href="' + v.url + '" data_loc_id="' + headerSDK.data_loc_id_pre + '00001" data_id="400_adId_' + v.id + '" event_type="click" >\
									<span>' + v.title + '</span>\
									' + tag + '\
								</a>\
							</p>';
                    });
                    $('.tGmlt_02>.tGmlt_xiao').html(tmp);
                }
                if (data.data.casualgame.length > 0) {
                    var tmp = '';
                    $.each(data.data.casualgame, function(i, v) {
                        if (!v.title) return;
                        var tag = '';
                        if ('N' == v.remark) {
                            tag = '<i class="iconC iconC_gact_new"></i>';
                        } else if ('H' == v.remark) {
                            tag = '<i class="iconC iconC_gact_hot"></i>';
                        }
                        tmp += '\
							<p>\
								<a target="_blank" href="' + v.url + '" data_loc_id="' + headerSDK.data_loc_id_pre + '00001" data_id="500_adId_' + v.id + '" event_type="click" >\
									<span>' + v.title + '</span>\
									' + tag + '\
								</a>\
							</p>';
                    });
                    $('.tGmlt_03>.tGmlt_xiao').html(tmp);
                }
                $(".TopGameShow_Group").show();
                $(".iconC_game_on").removeClass("iconC_game_on").addClass("iconC_game_off");
            }
        });
    },


    setActHeader: function() {
        var _this = this;
        var $headHtml = '\
			<div class="gameHeader">\
		    <div class="game-gameTop">\
		        <h2 class="u-gameLogo"><a href="//www.youzu.com/" target="_blank" class="ir" title="游族网络"></a></h2>\
		        <div class="game-gameAD" id="game_dt_ad_min">\
		            <img src="" alt="周年庆" class="u-gameAD-small" style="display: inline;">\
		            <a  event_type="click" target="_blank" class="u-gameAD-big" style="display: none;">\
						<img src="" alt="周年庆">\
					</a>\
		        </div>\
		        <ul class="game-gameNav">\
		            <li class="header-login" id="toploginForm">\
		                <a href="javascript:;" id="toploginlink">登录</a><b>|</b>\
		                <a href="javascript:;" id="topreglink">注册</a><b>|</b>\
		            </li>\
		            <!-- 登录后 -->\
		            <li class="header-login" id="toplogoutForm" style="display:none">\
		                <span class="name">\
		                    <a href="//home.youzu.com/" target="_blank" class="comNickname"><b></b></a><i class="letter"></i></span><b>|</b>\
		                <a href="javascript:;" id="topLogout">注销</a><b>|</b>\
		                <!--信息弹层 -->\
		                <div class="p-message">\
		                    <div class="p-message-box">\
		                    </div>\
		                </div>\
		                <!--信息弹层 end -->\
		            </li>\
		            <li><a href="//pay.youzu.com/" target="_blank" rel="nofollow">充值</a><b>|</b></li>\
		            <li><a href="javascript:;" rel="nofollow" class="ding_kefu">客服</a><b>|</b></li>\
		            <li class="u-collectBox" id="collectBox">\
		                <a href="javascript:;" class="collect">收藏</a>\
		                <div class="u-collect" id="collectList">\
		                    <span class="u-tt">收藏</span>\
		                    <ul class="u-lst" id="scListContent">\
		                    </ul>\
		                </div>\
		            </li>\
		            <div class="header-prompt header-prompt-close" style="display:none;" id="linkRelName">\
		                <i></i> 为了您的账号安全，请尽快进行\
		                <a href="//home.youzu.com/id/index">实名认证 </a> ！<b>×</b>\
		            </div>\
		        </ul>\
		        <div class="game-topGame"> <a href="" class="top-game"> <i></i>游族游戏 </a>\
		            <!-- 游戏列表下拉 -->\
		            <div class="TopGameShow_Group top-gameBox cd  ">\
		                <!--左侧广告大图 -->\
		                <div class="tGmQu_a">\
		                    <a  data_id="2_gameAd" event_type="click"  target="_blank" class="top_gugutu"><img src="" alt="" width="488" height="487"></a>\
		                </div>\
		                <!--左侧广告大图 end -->\
		                <!--右侧区 -->\
		                <div class="tGmQu_b">\
		                    <div class="tGm_tit_zu"><span class="t-dazi">游戏列表</span>\
		                        <p class="tGm_zhutu">\
		                            <span><i class="iconC iconC_gact_hot"></i>最热游戏</span>\
		                            <span><i class="iconC iconC_gact_new"></i>最新游戏</span>\
		                        </p>\
		                    </div>\
		                    <!--游戏列表文字区 -->\
		                    <div class="tGm_list_Group clearfix">\
		                        <!--列表小组 -->\
		                        <div class="tGmlt_zu tGmlt_01">\
		                            <h2 class="tGmltitle">网页游戏</h2>\
		                            <div class="tGmlt_xiao"></div>\
		                        </div>\
		                        <!--列表小组 -->\
		                        <div class="tGmlt_zu tGmlt_02">\
		                            <h2 class="tGmltitle">手机游戏</h2>\
		                            <div class="tGmlt_xiao"></div>\
		                        </div>\
		                        <!--列表小组 -->\
		                        <div class="tGmlt_zu tGmlt_03">\
		                            <h2 class="tGmltitle">休闲游戏</h2>\
		                            <div class="tGmlt_xiao"></div>\
		                        </div>\
		                        <!--列表小组 end -->\
		                    </div>\
		                    <!--游戏列表文字区 end -->\
		                </div>\
		                <!--右侧区 end -->\
		            </div>\
		            <!-- /游戏列表下拉 -->\
		        </div>\
		    </div>\
		</div>';
        $('body').prepend($headHtml);


    },

};