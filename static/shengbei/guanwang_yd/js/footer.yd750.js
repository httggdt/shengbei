/*
** Plugin 移动端750底通
** Author 吾辈组长
** Usages 1.<script id="_FOOTER_" csh ybz tagUrl backColor linkColor mainColor src="footer.yd750.js"></script>
**   	  2.id 必填 _FOOTER_ 用于获取参数
**   	  3.csh(出审号) ybz(游备字) tagUrl(游戏电子标签) 不填默认空
**   	  4.backColor(背景色) linkColor(链接字体色) mainColor(主体字颜色) 不填默认
** Notice 哪里渲染，哪里引用
** relied px2rem.js reset.yd.css
*/
window.console = window.console || function() {
	var a = {};
	a.log = a.warn = a.debug = a.info = a.error = a.time = a.dir = a.profile = a.clear = a.exception = a.trace = a.assert = function() {};
	return a;
}();
(function(){
	var footerJs  = document.getElementById("_FOOTER_");
	if(!footerJs) {
		console.warn("_FOOTER_ NOT FOUND 请详细阅读使用方法！");
		return false;
	}
	// 初始化
	var backColor = footerJs.getAttribute("backColor") || "#373737";
	var linkColor = footerJs.getAttribute("linkColor") || "#a4a4a4";
	var mainColor = footerJs.getAttribute("mainColor") || "#5c5c5c";
	var csh       = footerJs.getAttribute("csh") ? "<span>"+footerJs.getAttribute("csh")+"</span>" : "";
	var ybz       = footerJs.getAttribute("ybz") ? "<span>"+footerJs.getAttribute("ybz")+"</span>" : "";
	var tagUrl    = footerJs.getAttribute("tagUrl") ? "<a href=\""+footerJs.getAttribute("tagUrl")+"\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAAAVFBMVEUAAAAAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibwAibzIXVToAAAAG3RSTlMAQ1AMJq2TzVrw2DefZInF+Lsd4utxSBV6BWzKbplsAAABrklEQVQ4y6WV17LrIAxFFap77/v///OawAXiYE9mznpxYdlIwhaUgldjRr9xdAD68gfzpU+xOe1mpWeGCuhqovU8on5U59NQnAylBorl1mQT0At/mXWAFElT9MDEKGLfTNj7l7mbdDZ7XzT+eQlM1/pleTTfCBXiKi71K1tA+zxak+Al34EcZvrZj0kYmiBzBXTkACT3IxUsW5x2B3J0eFGY4z9zJOvI9aluCBzBLbybe7dGTP3kMicpWLJ79+UU5kOZ79wyirNcDIzduINTGxo497XlKbfsXKzEJ0SILzesgY07UCXcVeNNuxOxset84VLx7iPeaPdVWFS6Djx3bz7PF/hzgw6uW6EhCHDwO5eEM2QLy0pp1y9HICsFf6VdG2dACqk1tg93Ci6xoE5ZVvXykBd3IU8Wr1jfrCuTn24/BLnWFmYqI1dSPTF41/2LKTJUVSkR3KU4L25arlAy/+wBB07aMuEu7dfIqoythkQzxhSqFHrPyXFpxidqT+WRm7CXuDnZHpuCb4BvgWw0T7KnLcDVT/T2N35k0eZ170wr8duWFXpsmriH5jP9iX9CszmTac4FvAAAAABJRU5ErkJggg==\"></a>" : "";
	// 渲染器
	document.writeln(
		'<style type="text/css">'+
		'#yd-footer {font-size: .14rem;background-color: '+backColor+';padding: 0 .38rem .28rem;margin: 0 auto;max-width: 750px;box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;overflow: hidden;text-align: center;line-height: 1;}'+
		'#yd-footer .yd-link {padding: .3rem 0;}'+
		'#yd-footer .yd-link a {display: inline-block;font-size: .26rem;color: '+linkColor+';padding: 0 .34rem;border-right: 1px dashed '+linkColor+';}'+
		'#yd-footer .yd-link a:last-child {border-right: 0;}'+
		'#yd-footer .yd-block, #yd-footer .yd-parent a, #yd-footer .yd-copy {color: '+mainColor+';}'+
		'#yd-footer .yd-block {font-size: .24rem;}'+
		'#yd-footer .yd-block span {display: inline-block;margin: 0 .14rem .16rem;}'+
		'#yd-footer .yd-parent a {font-size: .24rem;display: inline-block;padding-bottom: .04rem;border-bottom:1px solid '+mainColor+'}'+
		'#yd-footer .yd-verify {padding: .2rem 0;}'+
		'#yd-footer .yd-verify a {display: inline-block;width: .43rem;height: .43rem;margin: 0 .08rem;}'+
		'#yd-footer .yd-verify a img {height: 100%;}'+
		'#yd-footer .yd-copy {font-size: .2rem;}'+
		'</style>'+
		'<div id="yd-footer">'+
		'	<div class="yd-link">'+
		'		<a href="https://www.youzu.com/">游族平台</a>'+
		'		<a href="http://service.youzu.com/">客服中心</a>'+
		'		<a href="https://www.youzu.com/about/services.html">用户协议</a>'+
		'	</div>'+
		'	<div class="yd-block">'+
		'		<span>备案号：310104100043687</span><span>沪B2-20090105号</span><span>沪ICP备09058784号</span><span>沪网文[2015]0819-219</span><span>新出网证（沪）字33号</span>'+csh+ybz+
		'	</div>'+
		'	<div class="yd-parent">'+
		'		<a href="https://www.youzu.com/parent_ct.html">点击查看家长监护工程</a>'+
		'	</div>'+
		'	<div class="yd-verify">'+
		'		<a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/2F3FDE5B42FC4E90A67E5C08B1296F4C"><img src="data:image/png;base64,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"></a>'+tagUrl+
		'	</div>	'+
		'	<div class="yd-copy">上海游族信息技术有限公司版权所有</div>'+
		'</div>'
	);
})();