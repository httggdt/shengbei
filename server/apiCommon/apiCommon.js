var request = require('request');
var async = require('async');
var baseUrl = "http://webapi.youzu.com"; // 基础Url

exports.api = {
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
        // console.log(options)
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
		console.log(err)
		// exports.error.noapi(next);
		var body = {};
		body.data = [];
		callback(body)
	}
}