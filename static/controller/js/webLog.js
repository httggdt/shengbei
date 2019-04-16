
/**
 * info   一般程序执行信息
 * warning 	提示信息
 * error 	错误信息
 */

//<script data-cfasync="false" src="/controller/js/webLog.js"></script>
//<script >
//(function(){
//	var log = new YzWebLog({app_id:'hd.youzu.com'})
//	log.info("测试js日志");
//	log.on("test",function(e,arr){
//		console.log(e,arr)
//	})
//	log.emit('test',{arr:[111111,222]})
//})()
//
//</script>

;(function(undefined) {
    "use strict"
    var _global;

    // 工具函数
    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }
    
    var Ajax={
    	    get: function(url, fn) {
    	    	console.log(url);
    	        var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
    	        xhr.open('GET', url, true);
    	        xhr.onreadystatechange = function() {
    	            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
    	                fn.call(this, xhr.responseText);  //从服务器获得数据
    	            }
    	        };
    	        xhr.send();
    	    },
    	    post: function (url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    	        var xhr = new XMLHttpRequest();
    	        xhr.open("POST", url, true);
    	        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
    	        xhr.onreadystatechange = function() {
    	            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {  // 304未修改
    	                fn.call(this, xhr.responseText);
    	            }
    	        };
    	        xhr.send(data);
    	    }
    	}

    // 插件构造函数 - 返回数组结构
    function YzWebLog(opt){
        this._initial(opt);
    }
    YzWebLog.prototype = {
        constructor: this,
        _initial: function(opt) {
            // 默认参数
            var def = {
                confirm: function(){},
                app_id:null,
                url:"http://hd.youzu.com/api/log",
            };
            this.def = extend(def,opt,true); //配置参数
            this.listeners = []; //自定义事件，用于监听插件的用户交互
            this.handlers = {};
        },
        warning:function(message,callback){
        	Ajax.get(this.getUrl({message:message,level:"warning",app_id:this.def.app_id}),callback);
        },
        info:function(message,callback){
        	console.log(message)
        	Ajax.get(this.getUrl({message:message,level:"info",app_id:this.def.app_id}),callback);
        },
        error:function(message,callback){
        	Ajax.get(this.getUrl({message:message,level:"error",app_id:this.def.app_id}),callback);
        },
        getUrl:function(message){
        	var str = [];
        	for(var key in message){
        		str.push(key + "=" + message[key]);
        	}
        	return this.def.url+"?"+str.join("&");
        },
        on: function(type, handler){
            // type: show, shown, hide, hidden, close, confirm
            if(typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = [];
            }
            this.listeners.push(type);
            this.handlers[type].push(handler);
            return this;
        },
        off: function(type, handler){
            if(this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for(var i = 0, len = handlers.length; i < len; i++) {
                    if(handlers[i] === handler) {
                        break;
                    }
                }
                this.listeners.splice(i, 1);
                handlers.splice(i, 1);
                return this;
            }
        },
        emit: function(event){
            if(this.handlers[event] instanceof Array) {
                var handlers = this.handlers[event];
                var arr = Array.prototype.slice.apply(arguments); 
//                console.log(arr)
                for(var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](event,arr[1]);
                    return true;
                }
            }
            return false;
        }
    }

    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = YzWebLog;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return YzWebLog;});
    } else {
        !('YzWebLog' in _global) && (_global.YzWebLog = YzWebLog);
    }
}());

