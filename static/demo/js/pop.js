/**
 * 弹窗
 */
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

