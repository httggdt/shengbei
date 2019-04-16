
$(function () {
	//百度推送
	(function () {
		var bp = document.createElement('script');
		var curProtocol = window.location.protocol.split(':')[0];
		if (curProtocol === 'https') {
			bp.src = '//zz.bdstatic.com/linksubmit/push.js';
		} else {
			bp.src = '//push.zhanzhang.baidu.com/push.js';
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


	//尾部渲染  
	$.ajax({
		url: "//go.youzu.com/go-39/api/page-footer",
		type: 'GET',
		dataType: "jsonp",
		success: function (resfoot) {
			$(".FootWrap").html(resfoot.data.result);
		},
		error: function (err) {
			alert(err);
		}
	});
	
	// 微信分享
    var wxApp = new youzuWeixin({
        act_url: "", 
        act_id: "", //活动id
        shareTitle: '圣杯之魂', // 分享标题
        shareDesc: '邪魔觉醒，创新3D战斗卡牌手游邀你来战', // 分享描述
        shareLink: "//shengbei.youzu.com/m/", // 分享链接
        shareImgUrl: '//shengbei.youzu.com/shengbei/guanwang_yd/images/logo_icon.png', // 分享图标
        shareTimeTitle: '', // 时间标题

        shareSuccessCallback: function() {}
    });
    wxApp.share();

	

	// var test = window.location.href;
	// alert(test);
	// 手机端页面跳转
	var LowerCase = navigator.userAgent.toLowerCase();
	if (LowerCase.indexOf('windows nt') === -1 && LowerCase.indexOf('macintosh') === -1) {
		location.href = '/m';
	};


	// 进行预约
	var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	var wait = 60;

	function time(o) {
		if (wait == 0) {
			o.removeAttribute("disabled");
			o.value = "获取验证码";
			wait = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value = "重新发送(" + wait + ")";
			wait--;
			setTimeout(function () {
					time(o)
				},
				1000)
		}
	}

	$("#iosGetCode").click(function () {
		// 进行手机号的验证
		var phoneNum = $('#iosPhone').val();
		var flag = regPhone.test(phoneNum);
		if (flag) {
			// 进行提交获取验证码
			time(this);
			$.ajax({
				url: "//go.youzu.com/go-39/api/send-sms",
				type: 'GET',
				dataType: "jsonp",
				data: {
					tel: phoneNum,
					platform_type: 0
				},
				success: function (res) {
					//console.log("返回获手机验证码数据：", resmsg);
					if (res.status == 0 || res.status == 200) {
						// console.log(res);
					} else {
						$('#iosPhone').val('');
						$('#andPhone').val('');
						$('#andCode').val('');
						$('#andCode').val('');
						wait = 0;
						clearTimeout(time);
						wait2 = 0;
						clearTimeout(time2)
						alert(res.msg);
					}
				},
				error: function (err) {
					alert(err);
				}
			});
		} else {
			alert('请输入正确的手机号码哦~')
		}
	})

	var wait2 = 60;

	function time2(o) {
		if (wait2 == 0) {
			o.removeAttribute("disabled");
			o.value = "获取验证码";
			wait2 = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value = "重新发送(" + wait2 + ")";
			wait2--;
			setTimeout(function () {
					time2(o)
				},
				1000)
		}
	}

	// 安卓手机获取验证码
	$("#andGetCode").click(function () {
		// 进行手机号的验证
		var phoneNum = $('#andPhone').val();
		var flag = regPhone.test(phoneNum);
		if (flag) {
			// 进行提交获取验证码
			time2(this);
			$.ajax({
				url: "//go.youzu.com/go-39/api/send-sms",
				type: 'GET',
				dataType: "jsonp",
				data: {
					tel: phoneNum,
					platform_type: 0
				},
				success: function (res) {
					//console.log("返回获手机验证码数据：", resmsg);
					if (res.status == 0 || res.status == 200) {
						// console.log(res);
					} else {
						$('#iosPhone').val('');
						$('#andPhone').val('');
						$('#andCode').val('');
						$('#andCode').val('');
						wait = 0;
						clearTimeout(time);
						wait2 = 0;
						clearTimeout(time2)
						alert(res.msg);
						// 输入框
					}
				},
				error: function (err) {
					alert(err);
				}
			});
		} else {
			alert('请输入正确的手机号码哦~')
		}
	})

	// 提交预约的方法
	function subMit(type) {
		var phoneNum = type == 0 ? $('#andPhone').val() : $('#iosPhone').val();
		var flag = regPhone.test(phoneNum);
		var code = type == 0 ? $('#andCode').val() : $('#iosCode').val();
		if (flag) {
			if (code) {
				// 提交
				$.ajax({
					url: "//go.youzu.com/go-39/api/yuyue",
					type: 'GET',
					dataType: "jsonp",
					data: {
						tel: phoneNum,
						type: type, // ios
						code: code,
						platform_type: 0
					},
					success: function (res) {
						//console.log("返回获手机验证码数据：", resmsg);
						if (res.status == 0 || res.status == 200) {
							window.location.reload();
							$('#iosPhone').val('');
							$('#andPhone').val('');
							alert('恭喜亲，预约成功~');
						} else {
							$('#iosPhone').val('');
							$('#andPhone').val('');
							$('#andCode').val('');
							$('#andCode').val('');
							wait = 0;
							clearTimeout(time);
							wait2 = 0;
							clearTimeout(time2)
							alert(res.msg);
							// 输入框
						}
					},
					error: function (err) {
						alert(err);
					}
				});
			} else {
				alert('请输入正确的验证码哦~')
			}
		} else {
			alert('请输入正确的手机号码哦~')
		}
	}
	// ios的提交预约
	$("#submitIos").click(function () {
		subMit(1)
	})
	// 安卓的提交预约
	$("#submitAnd").click(function () {
		subMit(0)
	});



	// 选项卡 鼠标点击
	$(".TAB_CLICK li").click(function () {
		var tab = $(this).parent(".TAB_CLICK");
		var con = tab.attr("id");
		var on = tab.find("li").index(this);
		$(this).addClass('on').siblings(tab.find("li")).removeClass('on');
		$(con).eq(on).show().siblings(con).hide();
	});

	$('.TAB_CLICK').each(function (index, el) {
		$(this).find("li").filter(':first').trigger('click');
	});


	//预约弹窗
	$('.yuyue_xz_btn').click(function (event) {
		$('.m-overlay').fadeIn();
		$('.pop-order').fadeIn();
	});

	// 首页- 视频播放
	$('.play_btn_02').click(function (event) {
		$('.m-overlay').fadeIn();
		$('.pop-video').fadeIn();
		$(".video-top").show();
		$(".video-bottom").hide();
	});
	//首页- 下 - 视频播放
	$('.yxi_liank').click(function (event) {
		$('.m-overlay').fadeIn();
		$('.pop-video').fadeIn();
		$(".video-top").hide();
		$(".video-bottom").show();
	});

	//碎片页- 视频播放
	$('.dashi_liank').click(function (event) {
		var a = $(this).data("num");
		console.log(a);
		$('.m-overlay').fadeIn();
		$('.pop-video').hide();
		$(this).parent().next().fadeIn();
		// console.log($(this).parent().next());
	});
	//碎片页- 图片展示
	$('.tushang_pic').click(function (event) {
		var a = $(this).data("num");
		// console.log(a);
		$('.m-overlay').fadeIn();
		$('.pop_tuhua_Box').hide();
		$(this).parent().next().fadeIn();
		// console.log($(this).parent().next());
	});
	$('.btns_close_pop').click(function () {
		$(this).parent().fadeOut();
		$('.m-overlay').fadeOut();
	})


	// 弹窗关闭按钮
	$('.js_pop_close').click(function (event) {
		$(this).parent().fadeOut();
		$('.m-overlay').fadeOut();
		// 视频
		$(".pop-video video")[0].pause();
		$(".pop-video video")[1].pause();
		// $(".pop-video video")[2].pause();
		// $(".pop-video video")[3].pause();
		// $(".pop-video .icon").fadeIn();

		// 输入框
		$('#iosPhone').val('');
		$('#andPhone').val('');
		$('#andCode').val('');
		$('#andCode').val('');
		wait = 0;
		clearTimeout(time);
		wait2 = 0;
		clearTimeout(time2)
	});







	//鼠标经过显示 兵器
	$(".btn_wiqi li").mouseenter(function (event) {
		$(this).find("a").addClass("current");
		$(this).siblings().find("a").removeClass("current");
		$(".Wiqi_list li").hide().eq($(".btn_wiqi li").index(this)).show();
	});

	//鼠标经过显示 二级导航
	$(".navs1ji a").mouseenter(function (event) {
		$(".Nav_2ji_bar").show();
	});
	$(".Nav_2ji_bar").mouseleave(function (event) {
		$(".Nav_2ji_bar").hide();
	});

	$(".nji_1 a").mouseenter(function (event) {
		$(".Nav_2ji_bar").hide();
	});

	//鼠标经过显示 微信二维码 右侧
	$(".fen_weixin").mouseenter(function (event) {
		$(".pops_weixin").show();
	});
	$(".fen_weixin").mouseleave(function (event) {
		$(".pops_weixin").hide();
	});


	//鼠标经过显示 焦点新闻
	$(".HomeNewsZu li").mouseenter(function (event) {
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		$(".HomeNewsNr_Box .HomeNewsNr_Zu").hide().eq($(".HomeNewsZu li").index(this)).show();
	});

	//鼠标经过显示 龙大图标签
	$(".longsZu li").mouseenter(function (event) {
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		$(".LongShowGroup .LongTu_Zu").hide().eq($(".longsZu li").index(this)).show();
	});

	//鼠标经过显示 小图名字
	$(".Long_liank").mouseenter(function (event) {
		$(".Long_on").hide();
		$(this).siblings(".Long_on").show();
	});
	$(".Long_liank").mouseleave(function (event) {
		$(".Long_on").hide();
	});
	//首页英雄- 弹窗
	$('.Long_liank').click(function (event) {
		var a = $(this).data("num");
		console.log(a);
		$('.m-overlay').fadeIn();
		$('.pop_heng_bar').show();
		$(".pop_heng_Group").hide();
		$(".dialog-" + a).show();
	});
	$(".btns_close_pop").click(function (event) {
		$(".pop_heng_bar").fadeOut();
		$('.m-overlay').fadeOut();
	})

	//鼠标经过显示 资料站 品质图名字
	$(".pinzhi_Zu li").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".pinzhi_Zu li").mouseleave(function (event) {
		$(this).removeClass("cur");
	});



	//鼠标经过显示 武器介绍 图名字
	$(".Zhub_liank").mouseenter(function (event) {
		$(".Zhub_on").hide();
		$(this).siblings(".Zhub_on").show();
	});
	$(".Zhub_liank").mouseleave(function (event) {
		$(".Zhub_on").hide();
	});




	// 首页 鼠标经过显示 视频小图名字

	$(".yxi_zu ").mouseenter(function (event) {
		$(this).addClass("cur");
	});
	$(".yxi_zu ").mouseleave(function (event) {
		$(this).removeClass("cur");
	});


	//鼠标经过显示 版本图片
	$(".vdx_liank").mouseenter(function (event) {
		$(".vdx_on").hide();
		$(this).siblings(".vdx_on").show();
	});
	$(".vdx_liank").mouseleave(function (event) {
		$(".vdx_on").hide();
	});

	//=============== 猎龙影像 ================

	//鼠标经过显示 视频 遮罩
	$(".dashi_Zu li").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".dashi_Zu li").mouseleave(function (event) {
		$(this).removeClass("cur");
	});

	//鼠标经过显示 小视频 遮罩
	$(".Mxiaoshi_heUl li").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".Mxiaoshi_heUl li").mouseleave(function (event) {
		$(this).removeClass("cur");
	});

	//鼠标经过显示 游戏图赏 遮罩
	$(".datush_Zu li").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".datush_Zu li").mouseleave(function (event) {
		$(this).removeClass("cur");
	});

	//鼠标经过显示 游戏原画  遮罩
	$(".MxiHua_heUl li").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".MxiHua_heUl li").mouseleave(function (event) {
		$(this).removeClass("cur");
	});

	//鼠标 点击 游戏原画  遮罩
	$(".MxiHua_heUl li").click(function (event) {
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	});


	//============= 全横弹窗 =============

	//套装
	$(".TaoBoss_Box .btns_fuhuan").click(function () {
		$(".TaoBoss_Box").hide();
		$(".TaoZhuang_Box").show();
	});

	$(".TaoZhuang_Box .btns_fuhuan").click(function () {
		$(".TaoZhuang_Box").hide();
		$(".TaoBoss_Box").show();
	});

	//鼠标经过显示 武器  遮罩
	$(".btns_diaoluo").mouseenter(function (event) {
		$(this).siblings().removeClass("di_on");
		$(this).addClass("di_on");
		$(".wuXiang_qu").show();
	});


	$(".wuqi_niu_qu ").mouseleave(function (event) {
		$(".btns_diaoluo").removeClass("di_on");
		$(".wuXiang_qu").hide();
	});

	$(".wutou_xizu ").mouseenter(function (event) {
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".wutou_xizu ").mouseleave(function (event) {
		$(this).removeClass("cur");
	});


	//鼠标经过显示 奖励明细


	$(".Jlevel_zu .J_da").mouseenter(function (event) {
		$(".jiang_tips_Box p").hide().eq($(".Jlevel_zu .J_da").index(this)).show();
	});

	$(".Jlevel_zu li").mouseleave(function (event) {
		$(".jiang_tips_Box p").hide();
	});

	$(".Jlevel_zu .J_no").mouseenter(function (event) {
		$(this).children(".icon_dacheng").show();
	});

	$(".Jlevel_zu .J_no").mouseleave(function (event) {
		$(this).children(".icon_dacheng").hide();
	});



	//侧边栏隐藏显示 
	$(window).scroll(function () {
		var this_scrollTop = $(this).scrollTop();
		if (this_scrollTop > 360) {
			$(".sidenavbar").show();
		} else {
			$(".sidenavbar").hide();
		}

	});
	//OTHER 


	//OTHER


	//========横向切换（ ）========
	function boxScroll(BoxClass, liwidth) {
		var numbHan = 1; //一行的滚动个数
		var width = liwidth; //滚动小块的宽度
		var $Ul = $(BoxClass).find("ul");
		var $Ll = $Ul.children("li");
		var boxWidth = numbHan * width;
		var count = $($Ll).length;
		var hang = Math.ceil(count / numbHan);
		$Ul.css({
			width: count * width
		});
		var g = 0;
		$(BoxClass).find(".btn_prve").bind("click", function () {
			if (g != 0 && g > 0) {
				g = g - 1;
				$Ul.stop().animate({
					left: -g * boxWidth
				}, 100);
				changeXH(g);
			}
		});

		$(BoxClass).find(".btn_next").bind("click", function () {
			g = g + 1;
			if (g < hang) {
				$Ul.stop().animate({
					left: -g * boxWidth
				}, 300);
				changeXH(g);
			} else {
				$Ul.animate({
					left: 0
				}, 800);
				g = 0;
				changeXH(0);
			}
		});

		//添加序号 
		var $count = $(BoxClass).find(".count");
		if (count > numbHan) {
			$count.show();
		}
		for (var i = 0; i < hang; i++) {
			$($count).append("<a></a>");
		}
		changeXH(0);

		function changeXH(number) {
			$count.find("a").eq(number).addClass("current").siblings().removeClass("current");
		}
		$count.find("a").mouseenter(function () {
			var $index = $(this).index();
			$Ul.stop().animate({
				left: -boxWidth * $index
			}, 200);
			changeXH($index);
		});


	}

	$(function () {
		boxScroll(".smbox_01", 186);
		boxScroll(".smbox_02", 285);
		boxScroll(".smbox_03", 285);
	});


	// other 




	//OTHER
	$(".btns_play").click(function () {
		$(".pop_mark").show();
		$(".overlay").show();
		$(".pop_down").hide();
	});
	//OTHER 
	$(".btns_play").click(function () {
		$(".pop_mark").show();
		$(".overlay").show();
		$(".pop_down").hide();
	});
	//OTHER 
	$(".btns_play").click(function () {
		$(".pop_mark").show();
		$(".overlay").show();
		$(".pop_down").hide();
	});

	//OTHER

});