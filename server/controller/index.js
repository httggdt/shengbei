import { Router } from 'express';
import request from 'request';
import httpHelper from '../helper/http';
import cache from '../helper/cache';
var bodyParser = require('body-parser');

const router = Router()
var cacehData = false;

// Mock Users
const users = [
  { name: 'Alexandre1' },
  { name: 'Pooya1' },
  { name: 'Sébastien1' },
]

/* GET users listing.    默认的访问入口   例：http://hd.youzu.com:8088/controller */
router.get('/', function (req, res, next) {
	console.log('/ ');
  res.json({code:100,message:'ok',data:users})
})

/* GET users listing.    默认的访问入口   例：http://hd.youzu.com:8088/controller
 *
 * 获取参数   req.query   实例 | req.query.a
 * post 获取参数  req.body 实例 | req.body.site_id
 *
 * */
router.get('/json(\.html)?', function (req, res, next) {
	console.log('/json get query',req.query.a);
	console.log('/json get  body',req.body);
	res.json({code:100,message:'ok',data:users})
})

//post 请求
router.post('/json(\.html)?',bodyParser.json(), function (req, res, next) {
	console.log('/json post query',req.query);
	console.log('/json post  body',req.body.site_id);
	res.json({code:100,message:'ok',data:users})
})


/*  例： http://hd.youzu.com:8088/controller/ejs */
/*
 *
 * request  请求说明   https://github.com/request/request
  get 方式请求接口
  request.get({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ })

  post 方式请求接口
  request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ })
 */
router.get('/ejs', function (req, res, next) {
	//清除varnish 缓存实时返回数据
	res.setHeader('Cache-control','no-cache,no-store,must-revalidate');
	res.setHeader('Pragma','no-cache');
	res.setHeader('Expires','0');

	console.log('/ejs');
	//当不需求实时更新的数据可以做成缓存，设置失效时间  当失效的时候自动请求接口再把数据缓存起来
	if( 1 || cacehData == false){

		//请求接口
		request('http://cmsapi2.uuzu.com/api/article/BatchInfo?site_id=123&ids=5134552', function (error, response, body) {
			//返回的的数据 body 是json 字符串
			if (!error && response.statusCode == 200) {
				cacehData = body;
				//传入参数渲染页面返回给客户端
				res.render("controller/ew/index", {title : body});
			}
		})

	}else{
		res.render("controller/ew/index", {title : cacehData});
	}

})




//多个接口同步执行请求
router.get("/await",function(req, res, next){

	// 多个接口 同步请求接口 再渲染页面

	(async function (){
		var rsData = Array();
	    rsData.push(await httpHelper.get('http://127.0.0.1:8088/controller/json?a=222',{site_id:123,ids:5134552}));
	    rsData.push(await httpHelper.post('http://127.0.0.1:8088/controller/json',{site_id:123,ids:5134552}));
//	    console.log(rsData[0].data);

	    var rs = cache.set("test",'212222',10);
//		console.log('cahce 1',rs);
		var rs = await cache.get("test");
		console.log('cahce 2',rs);

	    res.render("controller/ew/index", {title : '1121211121',rsData:'111'});
	})()

})


/* GET user by ID. */
router.get('/:id(\\d+)(\.html)?', function (req, res, next) {
    res.json(req.params)
})

export default router
