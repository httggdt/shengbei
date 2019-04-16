var request = require('request');
var async = require('async');
var baseUrl = "https://uapi.youzu.com/api/158"; // 后端接口Url

exports.xhr = {
	/**
	 * @description ApiGet请求
	 */
	get : function(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs:data,
			headers: {},
			timeout: 10000
		};
		request(options, function(err, res, body) {
			apicallback(err, res, body, callback, next)
		});
	},
	/**
	 * @description ApiPost请求
	 */
	post : function(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type":'application/json'
			},
			timeout: 10000
		};
		request(options, function(err, res, body) {
			apicallback(err, res, body, callback, next)
		});
	},
	/**
	 * @description 头部带TOKEN的ApiGet请求
	 */
	tokenget : function(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs:data,
			headers: {
				"X-token": token,
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function(err, res, body) {
			apicallback(err, res, body, callback, next)
		});
	},
	/**
	 * @description 头部带TOKEN的ApiPost请求
	 */
	tokenpost : function(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"X-token": token,
				"Content-Type":'application/json'
			},
			timeout: 10000
		};
		request(options, function(err, res, body) {
			apicallback(err, res, body, callback, next)
		});
	}
}

/**
 * @description 接口返回统一处理
 */
function apicallback(err, res, body, callback, next) {
	if(!err && res.statusCode == 200){
		try{
			body = JSON.parse(body);
			if(body.status != 200){
				if(body.message){
					callback(body);
				}else{
					// exports.error.custom('Oops! 发生问题了', body.status, body.message, next);
					// body = [];
					body.data = [];
					callback(body)
				}
			}else{
				callback(body);
			}
		}catch(err){
			// console.log(err)
			// exports.error.noapi(next);
			body.data = [];
			callback(body)
		};
	}else{
		console.log('没有api')
		// exports.error.noapi(next);
		var body = {};
		body.data = [];
		callback(body)
	}
}

/**
 * @description 错误&提示处理
 */
exports.error = {
	openapp:function(next) {
		errorFun("Access error", 200, "此页面只允许在客户端中打开", next);
	},
	nosql:function(next) {
		errorFun("Database connection failed", 500, "无法连接到数据库或连接超时", next);
	},
	noapi:function(next) {
		errorFun("Interface failed", 500, "无法链接到接口或链接超时", next);
	},
	format:function(next) {
		errorFun("Format error", 500, "接口不是一个有效的JSON格式", next);
	},
	default:function(next) {
		console.log(next)
		errorFun("Oops! 发生问题了 :(", 500, "无法打开这个页面", next);
	},
	custom:function(name, status, stack, next) {
		errorFun(name, status, stack, next);
	}
}

function errorFun (name, status, stack, next) {
	console.log('[' + new Date().toLocaleString() + ']', name, status);
	var err = new Error(name);
		err.status = status;
		err.stack = stack;
		console.log(next)
	next(err);
}

// 日期格式化
exports.formateDate = function (date) {
    var defaultDate = date ? new Date(date) : new Date();
    var year = defaultDate.getFullYear();
    var month = defaultDate.getMonth() + 1;
    var day = defaultDate.getDate();
    month = month < 10 ? '0'+ month : month;
    day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day
}