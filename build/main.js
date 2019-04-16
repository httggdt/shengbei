require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var conf = {
  ip: '127.0.0.1',
  port: 9421,
  cache: {
    ip: '10.22.17.12',
    password: "quai7ooShei4eyee"
  },
  path: "/data/html/shengbei.youzu.com/"
};

/* harmony default export */ __webpack_exports__["default"] = (conf);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__data__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request__);



var httpHelper = {
		get: function get(url, data) {
				return new Promise(function (resolve, reject) {
						__WEBPACK_IMPORTED_MODULE_1_request___default.a.get({
								url: url,
								method: "get",
								json: true,
								headers: {
										"content-type": "application/json"
								},
								body: data
						}, function (err, response, body) {
								// console.log('返回结果：',data,body);
								if (!err && response.statusCode == 200) {
										if (body !== 'null') {
												//解析json    JSON.stringify(data)  转换成json
												if (__WEBPACK_IMPORTED_MODULE_0__data___default.a.isString(body)) {
														body = JSON.parse(data);
												}
												resolve(body);
										}
								}
								resolve(false);
						});
				});
		},
		post: function post(url, data) {
				return new Promise(function (resolve, reject) {
						__WEBPACK_IMPORTED_MODULE_1_request___default.a.post({
								url: url,
								method: "post",
								json: true,
								headers: {
										"content-type": "application/x-www-form-urlencoded"
								},
								body: data
						}, function (err, response, body) {
								// console.log('返回结果：',data,body);
								if (!err && response.statusCode == 200) {
										if (body !== 'null') {
												//解析json    JSON.stringify(data)  转换成json
												if (__WEBPACK_IMPORTED_MODULE_0__data___default.a.isString(body)) {
														body = JSON.parse(data);
												}
												resolve(body);
										}
								}
								resolve(false);
						});
				});
		}
};

/* harmony default export */ __webpack_exports__["a"] = (httpHelper);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(7);

var redis = __webpack_require__(20);

/**
 * 封装redis 缓存基本方法
 */

var client = redis.createClient(__WEBPACK_IMPORTED_MODULE_0__conf__["a" /* default */].cache.port, __WEBPACK_IMPORTED_MODULE_0__conf__["a" /* default */].cache.ip);

var cache = {};

var version = 1;

client.on('error', function (err) {
	console.log('Redis Error ' + err);
});

/**
 * 获取缓存数据
 */
cache.get = function (key) {
	key = getKey(key);

	return new Promise(function (resolve, reject) {

		client.get(key, function (err, reply) {
			if (err) {
				resolve(false);
			} else {
				resolve(reply);
			}
		});
	});
};

/**
 * 设置缓存数据
 * @param key 缓存key
 * @param val 缓存数据   string
 * @param time 缓存时间 0 标示永久有效
 */
cache.set = function (key, val) {
	var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	key = getKey(key);

	client.set(key, val, 'EX', time);

	return true;
};

function getKey(key) {
	return "node:" + key;
}

/* unused harmony default export */ var _unused_webpack_default_export = (cache);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var yz_conf = {};
//引入环境配置
if (true) {
	yz_conf = __webpack_require__(3).default;
} else {
	yz_conf = require('./dev.conf').default;
}

/* harmony default export */ __webpack_exports__["a"] = (yz_conf);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var request = __webpack_require__(2);
var async = __webpack_require__(1);
var baseUrl = "http://webapi.youzu.com"; // 基础Url

exports.api = {
	/**
  * @description ApiGet请求
  */
	get: function get(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs: data,
			headers: {},
			timeout: 10000
		};
		// console.log(options)
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description ApiPost请求
  */
	post: function post(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description 头部带TOKEN的ApiGet请求
  */
	tokenget: function tokenget(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs: data,
			headers: {
				"X-token": token,
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description 头部带TOKEN的ApiPost请求
  */
	tokenpost: function tokenpost(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"X-token": token,
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	}

	/**
  * @description 接口返回统一处理
  */
};function apicallback(err, res, body, callback, next) {
	if (!err && res.statusCode == 200) {
		try {
			body = JSON.parse(body);
			if (body.status != 200) {
				if (body.message) {
					callback(body);
				} else {
					// exports.error.custom('Oops! 发生问题了', body.status, body.message, next);
					// body = [];
					body.data = [];
					callback(body);
				}
			} else {
				callback(body);
			}
		} catch (err) {
			// console.log(err)
			// exports.error.noapi(next);
			body.data = [];
			callback(body);
		};
	} else {
		console.log('没有api');
		console.log(err);
		// exports.error.noapi(next);
		var body = {};
		body.data = [];
		callback(body);
	}
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shengbei_pc__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shengbei_yd__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_http__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_cache__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_util_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_util_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__api_util_js__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


//引入路由


var async = __webpack_require__(1);




var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || __WEBPACK_IMPORTED_MODULE_3__conf__["a" /* default */].ip;
//设置端口号
var port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_3__conf__["a" /* default */].port;
var path = __webpack_require__(22);

//版本号
var version = 1;
//配置模板渲染引擎
var ejs = __webpack_require__(23);
app.engine('html', ejs.renderFile);
//设置模板后缀
app.set("view engine", "html");
app.set("view cache", false);
app.set('views', __WEBPACK_IMPORTED_MODULE_3__conf__["a" /* default */].path + 'views');

app.set('port', port);

app.use('/api', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */]);


var bodyParser = __webpack_require__(6);

var xhr = __WEBPACK_IMPORTED_MODULE_8__api_util_js___default.a.xhr;
var cacehData = false;
var formateDate = __WEBPACK_IMPORTED_MODULE_8__api_util_js___default.a.formateDate;

//托管静态资源
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static('static'));

// 圣杯之魂预约站-pc 
app.get("/yuyue.html", function (req, res, next) {
  res.render("shengbei/shengbei_pc/yuyue", {
    env: "production"
  });
});

// 圣杯之魂预约站-mob
app.get("/m/yuyue.html", function (req, res, next) {
  res.render("shengbei/shengbei_yd/yuyue", {
    env: "production"
  });
});

// -------------- PC端-----------开始-------------
//1. 主页面路由
app.get('/', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var rsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei');

          case 2:
            rsData = _context.sent;

            console.log(rsData);
            res.render("shengbei/guanwang_pc/index.html", { rsData: rsData });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
});

//3.新闻-新闻页
app.get('/news(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/news?page=1');

          case 2:
            newsData = _context2.sent;

            // console.log(newsData.data)
            res.render("shengbei/guanwang_pc/news.html", { newsData: newsData });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }))();
});

//4-1.新闻-最新页
app.get('/hot(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3() {
    var newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/newNews?page=1');

          case 2:
            newsData = _context3.sent;

            // console.log(newsData.data)
            res.render("shengbei/guanwang_pc/hot.html", { newsData: newsData });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }))();
});
//4-2.新闻-公告页
app.get('/notice(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4() {
    var newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/notice?page=1');

          case 2:
            newsData = _context4.sent;

            // console.log(newsData.data.newslist)
            res.render("shengbei/guanwang_pc/notice.html", { newsData: newsData });

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }))();
});
//4-3.新闻-活动页
app.get('/active(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5() {
    var newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/active?page=1');

          case 2:
            newsData = _context5.sent;

            // console.log(newsData.data.newslist)
            res.render("shengbei/guanwang_pc/active.html", { newsData: newsData });

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }))();
});
//4-4.新闻-媒体页
app.get('/media(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6() {
    var newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/media?page=1');

          case 2:
            newsData = _context6.sent;

            // console.log(newsData.data)
            res.render("shengbei/guanwang_pc/media.html", { newsData: newsData });

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }))();
});

//5.英雄页
app.get('/hero(\.html)?', function (req, res, next) {

  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7() {
    var heroData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/heroSearch');

          case 2:
            heroData = _context7.sent;

            // console.log(heroData.data.hero[0].skill.pic)
            res.render("shengbei/guanwang_pc/hero.html", { heroData: heroData });

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }))();
});

//6.碎片(影像)页
app.get('/yingxiang(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee8() {
    var picData, mediaData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/game_pic');

          case 2:
            picData = _context8.sent;
            _context8.next = 5;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/media');

          case 5:
            mediaData = _context8.sent;

            // console.log(picData.data)
            // console.log(mediaData.data.game_img[0].thumb[1])
            res.render("shengbei/guanwang_pc/yingxiang.html", { picData: picData, mediaData: mediaData });

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }))();
});

//7.新手页
app.get('/adv1(\.html)?', function (req, res, next) {

  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee9() {
    var playerData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/new?page=1');

          case 2:
            playerData = _context9.sent;

            // console.log(playerData.data.totalPage)
            res.render("shengbei/guanwang_pc/adv1.html", { playerData: playerData });

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }))();
});

//8.高手页
app.get('/adv2(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee10() {
    var playerData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/old?page=1');

          case 2:
            playerData = _context10.sent;

            // console.log(playerData.data)
            res.render("shengbei/guanwang_pc/adv2.html", { playerData: playerData });

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }))();
});

//9.FAQ页
app.get('/faq(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee11() {
    var faqData, newsData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/mobile/faq');

          case 2:
            faqData = _context11.sent;
            _context11.next = 5;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/newNews');

          case 5:
            newsData = _context11.sent;


            // console.log(faqData.data)
            res.render("shengbei/guanwang_pc/faq.html", { faqData: faqData, newsData: newsData });

          case 7:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }))();
});

// -----------PC端----------结束---------------


// --------------  mob端---------开始---------------
//1. 主页面路由
app.get('/m/', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee12() {
    var rsData, mediaData, wrapData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei');

          case 2:
            rsData = _context12.sent;
            _context12.next = 5;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/media');

          case 5:
            mediaData = _context12.sent;
            _context12.next = 8;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/mobile/getSowingMap');

          case 8:
            wrapData = _context12.sent;


            // console.log(rsData.data)
            res.render("shengbei/guanwang_yd/index.html", { rsData: rsData, mediaData: mediaData, wrapData: wrapData });

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }))();
});

//2.新闻页
app.get('/m/news(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee13() {
    var newsData, noticeData, activeData, mediaData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/news');

          case 2:
            newsData = _context13.sent;
            _context13.next = 5;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/notice');

          case 5:
            noticeData = _context13.sent;
            _context13.next = 8;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/active');

          case 8:
            activeData = _context13.sent;
            _context13.next = 11;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/media');

          case 11:
            mediaData = _context13.sent;

            // console.log(newsData.data)
            res.render("shengbei/guanwang_yd/news.html", { newsData: newsData, noticeData: noticeData, activeData: activeData, mediaData: mediaData });

          case 13:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }))();
});

//3-1.新手页
app.get('/m/listBeginner(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/listBeginner.html");
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee14() {
    var playerData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/new');

          case 2:
            playerData = _context14.sent;

            // console.log(playerData.data.totalPage)
            res.render("shengbei/guanwang_yd/listBeginner.html", { playerData: playerData });

          case 4:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }))();
});
//3-2.高手页
app.get('/m/listBetter(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/listBetter.html");
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee15() {
    var playerData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/old');

          case 2:
            playerData = _context15.sent;

            // console.log(playerData.data)
            // console.log(playerData.data.totalPage)
            res.render("shengbei/guanwang_yd/listBetter.html", { playerData: playerData });

          case 4:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }))();
});

// 4.FAQ页
app.get('/m/faq(\.html)?', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee16() {
    var faqData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/mobile/faq');

          case 2:
            faqData = _context16.sent;

            // console.log(faqData.data)
            res.render("shengbei/guanwang_yd/faq.html", { faqData: faqData });

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }))();
});

//5.原画页
app.get('/m/pic(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/pic.html");
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee17() {
    var picData, mediaData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/game_pic');

          case 2:
            picData = _context17.sent;
            _context17.next = 5;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/sbGuanwang/default/media');

          case 5:
            mediaData = _context17.sent;

            // console.log(picData.data)
            // console.log(mediaData.data.game_img[0].thumb[1])
            res.render("shengbei/guanwang_yd/pic.html", { picData: picData, mediaData: mediaData });

          case 7:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this);
  }))();
});

//2-0. 新闻详情页
app.get('/m/:name/:id?(\.html)', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee18() {
    var name, id, newsData, detailData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            name = req.params.name;
            id = req.params.id;
            // console.log(name, id);

            _context18.next = 4;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/newNews');

          case 4:
            newsData = _context18.sent;
            _context18.next = 7;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/' + name + '/' + id);

          case 7:
            detailData = _context18.sent;

            //     // console.log(newsData.data)
            res.render("shengbei/guanwang_yd/news_details.html", { newsData: newsData, detailData: detailData, name: name, id: id });

          case 9:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }))();
});

// -----------   mob端---------结束---------------


app.get('/sitemap.xml', renderSitemapHd); // 搜索爬虫
app.get('/sitemap.html', renderSitemapHd); // 搜索爬虫
app.get('/sitemap.txt', renderSitemapHd); // 搜索爬虫


//搜索爬虫
function renderSitemapHd(req, res, next) {
  var page = req.query.page == undefined ? 1 : req.query.page;
  async.series({
    articleList: function articleList(callback) {
      xhr.get('shengbei/guanwang_pc/news.html?id=news&page=1&count=999', {}, function (res) {
        callback(null, res.data);
      });
    },
    hotList: function hotList(callback) {
      xhr.get('shengbei/guanwang_pc/hot.html?id=hot&page=1&count=999', {}, function (res) {
        callback(null, res.data);
      });
    }
  }, function (error, result) {
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    res.render('shengbei/guanwang_pc/sitemap', {
      env: "production",
      articleList: result.articleList == null ? [] : result.articleList,
      hotList: result.hotList == null ? [] : result.hotList,
      nowDate: formateDate(new Date())
    });
  });
}

//2.新闻详情页 ------------pc-----------
app.get('/:name/:id?(\.html)', function (req, res, next) {
  _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.mark(function _callee19() {
    var name, id, newsData, detailData;
    return __WEBPACK_IMPORTED_MODULE_0_E_git_work_shengbei_youzu_com_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            name = req.params.name;
            id = req.params.id;
            _context19.next = 4;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/newNews');

          case 4:
            newsData = _context19.sent;
            _context19.next = 7;
            return __WEBPACK_IMPORTED_MODULE_6__helper_http__["a" /* default */].get('//webapi.youzu.com/shengbei/' + name + '/' + id);

          case 7:
            detailData = _context19.sent;

            // console.log(newsData.data)
            res.render("shengbei/guanwang_pc/news_details.html", { newsData: newsData, detailData: detailData, name: name, id: id });

          case 9:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }))();
});
//新闻详情页 ------------pc-----------


//定义错误处理方法
app.use(function (err, req, res, next) {
  console.log(err + '测试');
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(function (err, req, res, next) {
  console.log("报错日志", err.stack);
  res.status(404).send('Something broke!');
});
;

app.use(function (req, res, next) {
  // 设置所有HTTP请求的超时时间
  req.setTimeout(10000);
  // 设置所有HTTP请求的服务器响应超时时间
  res.setTimeout(10000);
  next();
});

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__log__ = __webpack_require__(14);





var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__log__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Mock Users
var users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);



var ip = __webpack_require__(15);

var logger = __webpack_require__(17).createFluentSender('log.hd-.application', {
	host: '10.7.32.240',
	port: 24224,
	timeout: 3.0,
	reconnectInterval: 600000 // 10 minutes
});
logger.on('error', function (error) {
	console.log('fluent-logger error', error);
});
logger.on('connect', function () {
	console.log('fluent-logger', 'connected!');
});

var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

var json = {}
//	    "message": "这是日志消息", //日志消息
////	    "category": "yii\\db\\Command::query",   //日志分类
//	    "level": "info",	//日志等级
////	    "timeline": "", //客户端时间
//	    "server_ip": "10.6.55.3",   //服务器ip
//	    "clinet_ip": "58.246.221.75", //客户端ip

/* GET users listing. */
;router.get('/log', function (req, res, next) {
	console.log('/log');
	var message = {};
	message.level = req.query.level;
	message.host = req.host;
	message.app_id = req.query.app_id;
	message.message = req.query.message + "-----" + req.headers['user-agent'];
	//	message.message = '这是日志消息'
	//message.category = "log.hd.web"
	//message.timeline = req.query.timeline
	message.clinet_ip = ip.getClientIp(req);
	var message = formatMessage(message);

	logger.emit('web', message);
	res.json({ code: 100 });
});

//格式化消息
function formatMessage(message) {
	json.server_ip = ip.serviceIp();
	json.level = message.level;
	json.app_id = message.app_id;
	json.host = message.host;
	//	json.category = message.category
	//	json.timeline = message.timeline
	json.message = message.message;
	json.clinet_ip = message.clinet_ip;
	console.log(json);
	return json;
}

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var os = __webpack_require__(16);

var ip = {
	serviceIp: function serviceIp() {
		var network = os.networkInterfaces();
		for (var key in network) {
			if (key == "eth0" || key == "本地连接") {
				for (var i = 0; i < network[key].length; i++) {
					if (network[key][i].family === 'IPv4') {
						return network[key][i].address;
					}
				}
			}
		}
	},
	getClientIp: function getClientIp(req) {
		var ipAddress;
		var forwardedIpsStr = req.header('x-forwarded-for');
		if (forwardedIpsStr) {
			var forwardedIps = forwardedIpsStr.split(',');
			ipAddress = forwardedIps[0];
		}
		if (!ipAddress) {
			ipAddress = req.connection.remoteAddress;
		}
		return ipAddress;
	}
};

module.exports = ip;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fluent-logger");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_http__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_cache__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__conf_pro_conf__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js__);

var async = __webpack_require__(1);





var api = __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js___default.a.api;

var bodyParser = __webpack_require__(6);
var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var cacehData = false;
// console.log(process.env.NODE_ENV + '123')


// 更改监听的路由

function getClientIp(req) {
				return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

// //1. 主页面路由
// router.get('/', function (req, res, next) {
//     res.redirect("index.html");
// })

// router.get('/index(\.html)?', function (req, res, next) { 

//     (async function() {
//         var rsData = await httpHelper.get('http://webapi.youzu.com/shengbei');
//         // console.log(rsData.data.hero[0].skill)
// 	    res.render("shengbei/guanwang_pc/index.html", { rsData: rsData});
//     })()
// })


// //2.新闻页
// router.get('/news(\.html)?', function (req, res, next) {

//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/news');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/news.html", { newsData: newsData});
//     })()

// })

// //3.新闻详情页
// router.get('/news_details/:name/:id?(\.html)', function (req, res, next) {
//     (async function() {
//         var name = req.params.name;
//         var id = req.params.id;
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/newNews');
//         var detailData = await httpHelper.get('http://webapi.youzu.com/shengbei/'+name+'/'+ id);
//         // console.log(detailData.data);
//         res.render("shengbei/guanwang_pc/news_details.html", { newsData: newsData, detailData:detailData});
//     })()
// })


// //4-1.新闻-最新页
// router.get('/hot(\.html)?', function (req, res, next) {
//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/newNews?page:1');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/hot.html", { newsData: newsData});
//     })()
// })
// //4-2.新闻-新闻页
// router.get('/news(\.html)?', function (req, res, next) {
//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/news?page:1');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/news.html", { newsData: newsData});
//     })()
// })
// //4-3.新闻-公告页
// router.get('/notice(\.html)?', function (req, res, next) {
//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/notice?page:1');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/notice.html", { newsData: newsData});
//     })()
// })
// //4-4.新闻-活动页
// router.get('/active(\.html)?', function (req, res, next) {
//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/active?page:1');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/active.html", { newsData: newsData});
//     })()
// })
// //4-5.新闻-媒体页
// router.get('/media(\.html)?', function (req, res, next) {
//     (async function() {
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/media?page:1');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_pc/media.html", { newsData: newsData});
//     })()
// })


// //5.英雄页
// router.get('/hero(\.html)?', function (req, res, next) {

//     (async function() {
//         var heroData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/heroSearch');
//         // console.log(heroData.data.hero[0].skill.pic)
// 	    res.render("shengbei/guanwang_pc/hero.html", { heroData: heroData});
//     })()

// })

// //6.碎片(影像)页
// router.get('/yingxiang(\.html)?', function (req, res, next) {
//     (async function() {
//         var picData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/game_pic');
//         var mediaData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/media');
//         // console.log(picData.data)
//         // console.log(mediaData.data.game_img[0].thumb[1])
// 	    res.render("shengbei/guanwang_pc/yingxiang.html", { picData: picData, mediaData: mediaData});
//     })()
// })

// //7.新手页
// router.get('/adv1(\.html)?', function (req, res, next) {

//     (async function() {
//         var playerData = await httpHelper.get('http://webapi.youzu.com/shengbei/new?page:1');
//         // console.log(playerData.data.totalPage)
// 	    res.render("shengbei/guanwang_pc/adv1.html", { playerData: playerData});
//     })()
// })

// //8.高手页
// router.get('/adv2(\.html)?', function (req, res, next) {
//     (async function() {
//         var playerData = await httpHelper.get('http://webapi.youzu.com/shengbei/old?page:1');
//         // console.log(playerData.data)
// 	    res.render("shengbei/guanwang_pc/adv2.html", { playerData: playerData});
//     })()
// })

// //9.FAQ页
// router.get('/faq(\.html)?', function (req, res, next) {
//     (async function() {
//         var faqData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/mobile/faq');
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/newNews');

//         // console.log(faqData.data)
// 	    res.render("shengbei/guanwang_pc/faq.html", { faqData: faqData, newsData:newsData});
//     })()
// })


/* unused harmony default export */ var _unused_webpack_default_export = (router);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//判断是否是json
exports.isJson = function (obj) {
	var isjson = (typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
	return isjson;
};

//判断是否是对象
exports.isObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

//判断是否是数组
exports.isArray = function (arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
};

//判断是否是字符串
exports.isString = function (arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_http__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_cache__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__conf_pro_conf__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js__);

var async = __webpack_require__(1);





var api = __WEBPACK_IMPORTED_MODULE_5__apiCommon_apiCommon_js___default.a.api;

var bodyParser = __webpack_require__(6);
var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
var cacehData = false;
// console.log(process.env.NODE_ENV + '123')

// //1. 主页面路由
// router.get('/m', function (req, res, next) {
//     (async function() {
//         var rsData = await httpHelper.get('http://webapi.youzu.com/shengbei');
//         var mediaData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/media');
//         var wrapData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/mobile/getSowingMap');

//         // console.log(rsData.data)
// 	    res.render("shengbei/guanwang_yd/index.html", { rsData: rsData, mediaData:mediaData, wrapData:wrapData});
//     })()
// })
// router.get('/m/index(\.html)?', function (req, res, next) {
//     (async function() {
//         var rsData = await httpHelper.get('http://webapi.youzu.com/shengbei');
//         var mediaData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/media');
//         var wrapData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/mobile/getSowingMap');

//         // console.log(rsData.data)
// 	    res.render("shengbei/guanwang_yd/index.html", { rsData: rsData, mediaData:mediaData, wrapData:wrapData});
//     })()
// })

// //2.新闻页
// router.get('/m/news(\.html)?', function (req, res, next) {
//     (async function() {
//         // 新闻数据
//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/news');
//         //公告数据
//         var noticeData = await httpHelper.get('http://webapi.youzu.com/shengbei/notice');
//         //活动
//         var activeData = await httpHelper.get('http://webapi.youzu.com/shengbei/active');
//         //媒体
//         var mediaData = await httpHelper.get('http://webapi.youzu.com/shengbei/media');
//         // console.log(newsData.data)
// 	    res.render("shengbei/guanwang_yd/news.html", { newsData: newsData, noticeData:noticeData, activeData:activeData, mediaData:mediaData});
//     })()
// })

// //2-0. 新闻详情页
// router.get('/m/news_details/:name/:id(\.html)?', function (req, res, next) {
//     // res.render("shengbei/guanwang_yd/news_details.html");
//     (async function() {
//         var name = req.params.name
//         var id = req.params.id.substring(0,req.params.id.length-5)
//     //     // console.log(name, id)

//         var newsData = await httpHelper.get('http://webapi.youzu.com/shengbei/newNews');
//     //     // console.log(1111111,'http://webapi.youzu.com/shengbei/'+name+'/'+id)
//         var detailData = await httpHelper.get('http://webapi.youzu.com/shengbei/:'+name+'/:'+id);
//     //     // console.log(newsData.data)
//         res.render("shengbei/guanwang_yd/news_details.html", { newsData: newsData, detailData:detailData});

//     })()
// })


// //3-1.新手页
// router.get('/m/listBeginner(\.html)?', function (req, res, next) {
//     // res.render("shengbei/guanwang_yd/listBeginner.html");
//     (async function() {
//         var playerData = await httpHelper.get('http://webapi.youzu.com/shengbei/new');
//         // console.log(playerData.data.totalPage)
// 	    res.render("shengbei/guanwang_yd/listBeginner.html", { playerData: playerData});
//     })()
// })
// //3-2.高手页
// router.get('/m/listBetter(\.html)?', function (req, res, next) {
//     // res.render("shengbei/guanwang_yd/listBetter.html");
//     (async function() {
//         var playerData = await httpHelper.get('http://webapi.youzu.com/shengbei/old');
//         // console.log(playerData.data)
//         // console.log(playerData.data.totalPage)
// 	    res.render("shengbei/guanwang_yd/listBetter.html", { playerData: playerData});
//     })()
// })

// // 4.FAQ页
// router.get('/m/faq(\.html)?', function (req, res, next) {
//     (async function() {
//         var faqData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/mobile/faq');
//         console.log(faqData.data)
// 	    res.render("shengbei/guanwang_yd/faq.html", { faqData: faqData});
//     })()
// })

// //5.原画页
// router.get('/m/pic(\.html)?', function (req, res, next) {
//     // res.render("shengbei/guanwang_yd/pic.html");
//     (async function() {
//         var picData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/game_pic');
//         var mediaData = await httpHelper.get('http://webapi.youzu.com/sbGuanwang/default/media');
//         // console.log(picData.data)
//         // console.log(mediaData.data.game_img[0].thumb[1])
// 	    res.render("shengbei/guanwang_yd/pic.html", { picData: picData, mediaData: mediaData});
//     })()
// })


/* unused harmony default export */ var _unused_webpack_default_export = (router);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var request = __webpack_require__(2);
var async = __webpack_require__(1);
var baseUrl = "https://uapi.youzu.com/api/158"; // 后端接口Url

exports.xhr = {
	/**
  * @description ApiGet请求
  */
	get: function get(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs: data,
			headers: {},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description ApiPost请求
  */
	post: function post(name, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description 头部带TOKEN的ApiGet请求
  */
	tokenget: function tokenget(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'GET',
			qs: data,
			headers: {
				"X-token": token,
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	},
	/**
  * @description 头部带TOKEN的ApiPost请求
  */
	tokenpost: function tokenpost(name, token, data, callback, next) {
		var options = {
			url: baseUrl + name,
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"X-token": token,
				"Content-Type": 'application/json'
			},
			timeout: 10000
		};
		request(options, function (err, res, body) {
			apicallback(err, res, body, callback, next);
		});
	}

	/**
  * @description 接口返回统一处理
  */
};function apicallback(err, res, body, callback, next) {
	if (!err && res.statusCode == 200) {
		try {
			body = JSON.parse(body);
			if (body.status != 200) {
				if (body.message) {
					callback(body);
				} else {
					// exports.error.custom('Oops! 发生问题了', body.status, body.message, next);
					// body = [];
					body.data = [];
					callback(body);
				}
			} else {
				callback(body);
			}
		} catch (err) {
			// console.log(err)
			// exports.error.noapi(next);
			body.data = [];
			callback(body);
		};
	} else {
		console.log('没有api');
		// exports.error.noapi(next);
		var body = {};
		body.data = [];
		callback(body);
	}
}

/**
 * @description 错误&提示处理
 */
exports.error = {
	openapp: function openapp(next) {
		errorFun("Access error", 200, "此页面只允许在客户端中打开", next);
	},
	nosql: function nosql(next) {
		errorFun("Database connection failed", 500, "无法连接到数据库或连接超时", next);
	},
	noapi: function noapi(next) {
		errorFun("Interface failed", 500, "无法链接到接口或链接超时", next);
	},
	format: function format(next) {
		errorFun("Format error", 500, "接口不是一个有效的JSON格式", next);
	},
	default: function _default(next) {
		console.log(next);
		errorFun("Oops! 发生问题了 :(", 500, "无法打开这个页面", next);
	},
	custom: function custom(name, status, stack, next) {
		errorFun(name, status, stack, next);
	}
};

function errorFun(name, status, stack, next) {
	console.log('[' + new Date().toLocaleString() + ']', name, status);
	var err = new Error(name);
	err.status = status;
	err.stack = stack;
	console.log(next);
	next(err);
}

// 日期格式化
exports.formateDate = function (date) {
	var defaultDate = date ? new Date(date) : new Date();
	var year = defaultDate.getFullYear();
	var month = defaultDate.getMonth() + 1;
	var day = defaultDate.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return year + '-' + month + '-' + day;
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map