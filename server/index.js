import express from 'express'
//引入路由
import api from './api'

var async = require('async');

import conf from './conf'
import shengbei_pc from './shengbei_pc'
import shengbei_yd from './shengbei_yd'
const app = express()
const host = process.env.HOST || conf.ip
//设置端口号
const port = process.env.PORT || conf.port
var path = require("path")
import httpHelper from './helper/http';
//版本号
var version = 1;
//配置模板渲染引擎
var ejs = require('ejs')
app.engine('html', ejs.renderFile);
//设置模板后缀
app.set("view engine", "html");
app.set("view cache", false);
app.set('views', conf.path + 'views');

app.set('port', port)

app.use('/api', api)

import cache from './helper/cache';
var bodyParser = require('body-parser');
import util from './api/util.js';
const xhr = util.xhr;
var cacehData = false;
const formateDate = util.formateDate;




//托管静态资源
app.use(express.static('static'));


// 圣杯之魂预约站-pc 
app.get("/yuyue.html",function(req, res, next){
  res.render("shengbei/shengbei_pc/yuyue",{
    env:process.env.NODE_ENV,
  });
}) 

// 圣杯之魂预约站-mob
app.get("/m/yuyue.html",function(req, res, next){
  res.render("shengbei/shengbei_yd/yuyue",{
    env:process.env.NODE_ENV,
  });
})


// -------------- PC端-----------开始-------------
//1. 主页面路由
app.get('/', function (req, res, next) {
  (async function() {
      var rsData = await httpHelper.get('//webapi.youzu.com/shengbei');
      console.log(rsData)
    res.render("shengbei/guanwang_pc/index.html", { rsData: rsData});
  })()
})



//3.新闻-新闻页
app.get('/news(\.html)?', function (req, res, next) {
  (async function() {
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/news?page=1');
      // console.log(newsData.data)
    res.render("shengbei/guanwang_pc/news.html", { newsData: newsData});
  })()
})

//4-1.新闻-最新页
app.get('/hot(\.html)?', function (req, res, next) {
  (async function() {
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/newNews?page=1');
      // console.log(newsData.data)
    res.render("shengbei/guanwang_pc/hot.html", { newsData: newsData});
  })()
})
//4-2.新闻-公告页
app.get('/notice(\.html)?', function (req, res, next) {
  (async function() {
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/notice?page=1');
      // console.log(newsData.data.newslist)
    res.render("shengbei/guanwang_pc/notice.html", { newsData: newsData});
  })()
})
//4-3.新闻-活动页
app.get('/active(\.html)?', function (req, res, next) {
  (async function() {
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/active?page=1');
      // console.log(newsData.data.newslist)
    res.render("shengbei/guanwang_pc/active.html", { newsData: newsData});
  })()
})
//4-4.新闻-媒体页
app.get('/media(\.html)?', function (req, res, next) {
  (async function() {
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/media?page=1');
      // console.log(newsData.data)
    res.render("shengbei/guanwang_pc/media.html", { newsData: newsData});
  })()
})

//5.英雄页
app.get('/hero(\.html)?', function (req, res, next) {

  (async function() {
      var heroData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/heroSearch');
      // console.log(heroData.data.hero[0].skill.pic)
    res.render("shengbei/guanwang_pc/hero.html", { heroData: heroData});
  })()

})

//6.碎片(影像)页
app.get('/yingxiang(\.html)?', function (req, res, next) {
  (async function() {
      var picData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/game_pic');
      var mediaData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/media');
      // console.log(picData.data)
      // console.log(mediaData.data.game_img[0].thumb[1])
    res.render("shengbei/guanwang_pc/yingxiang.html", { picData: picData, mediaData: mediaData});
  })()
})

//7.新手页
app.get('/adv1(\.html)?', function (req, res, next) {
  
  (async function() {
      var playerData = await httpHelper.get('//webapi.youzu.com/shengbei/new?page=1');
      // console.log(playerData.data.totalPage)
    res.render("shengbei/guanwang_pc/adv1.html", { playerData: playerData});
  })()
})

//8.高手页
app.get('/adv2(\.html)?', function (req, res, next) {
  (async function() {
      var playerData = await httpHelper.get('//webapi.youzu.com/shengbei/old?page=1');
      // console.log(playerData.data)
    res.render("shengbei/guanwang_pc/adv2.html", { playerData: playerData});
  })()
})

//9.FAQ页
app.get('/faq(\.html)?', function (req, res, next) {
  (async function() {
      var faqData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/mobile/faq');
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/newNews');
      
      // console.log(faqData.data)
    res.render("shengbei/guanwang_pc/faq.html", { faqData: faqData, newsData:newsData});
  })()
})

  

// -----------PC端----------结束---------------



// --------------  mob端---------开始---------------
//1. 主页面路由
app.get('/m/', function (req, res, next) {
  (async function() {
      var rsData = await httpHelper.get('//webapi.youzu.com/shengbei');
      var mediaData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/media');
      var wrapData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/mobile/getSowingMap');
      
      // console.log(rsData.data)
    res.render("shengbei/guanwang_yd/index.html", { rsData: rsData, mediaData:mediaData, wrapData:wrapData});
  })()
})

//2.新闻页
app.get('/m/news(\.html)?', function (req, res, next) {
  (async function() {
      // 新闻数据
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/news');
      //公告数据
      var noticeData = await httpHelper.get('//webapi.youzu.com/shengbei/notice');
      //活动
      var activeData = await httpHelper.get('//webapi.youzu.com/shengbei/active');
      //媒体
      var mediaData = await httpHelper.get('//webapi.youzu.com/shengbei/media');
      // console.log(newsData.data)
    res.render("shengbei/guanwang_yd/news.html", { newsData: newsData, noticeData:noticeData, activeData:activeData, mediaData:mediaData});
  })()
})



//3-1.新手页
app.get('/m/listBeginner(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/listBeginner.html");
  (async function() {
      var playerData = await httpHelper.get('//webapi.youzu.com/shengbei/new');
      // console.log(playerData.data.totalPage)
    res.render("shengbei/guanwang_yd/listBeginner.html", { playerData: playerData});
  })()
})
//3-2.高手页
app.get('/m/listBetter(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/listBetter.html");
  (async function() {
      var playerData = await httpHelper.get('//webapi.youzu.com/shengbei/old');
      // console.log(playerData.data)
      // console.log(playerData.data.totalPage)
    res.render("shengbei/guanwang_yd/listBetter.html", { playerData: playerData});
  })()
})

// 4.FAQ页
app.get('/m/faq(\.html)?', function (req, res, next) {
  (async function() {
      var faqData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/mobile/faq');
      // console.log(faqData.data)
    res.render("shengbei/guanwang_yd/faq.html", { faqData: faqData});
  })()
})

//5.原画页
app.get('/m/pic(\.html)?', function (req, res, next) {
  // res.render("shengbei/guanwang_yd/pic.html");
  (async function() {
      var picData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/game_pic');
      var mediaData = await httpHelper.get('//webapi.youzu.com/sbGuanwang/default/media');
      // console.log(picData.data)
      // console.log(mediaData.data.game_img[0].thumb[1])
    res.render("shengbei/guanwang_yd/pic.html", { picData: picData, mediaData: mediaData});
  })()
})

//2-0. 新闻详情页
app.get('/m/:name/:id?(\.html)', function (req, res, next) {
  (async function() {
      var name = req.params.name;
      var id = req.params.id;
      // console.log(name, id);

      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/newNews');
  //     // console.log(1111111,'//webapi.youzu.com/shengbei/'+name+'/'+id)
      var detailData = await httpHelper.get('//webapi.youzu.com/shengbei/'+name+'/'+id);
  //     // console.log(newsData.data)
      res.render("shengbei/guanwang_yd/news_details.html", { newsData: newsData, detailData:detailData,name:name, id:id});

  })()
})

// -----------   mob端---------结束---------------




app.get('/sitemap.xml', renderSitemapHd); // 搜索爬虫
app.get('/sitemap.html', renderSitemapHd); // 搜索爬虫
app.get('/sitemap.txt', renderSitemapHd); // 搜索爬虫


//搜索爬虫
function renderSitemapHd(req, res, next) {
  var page = req.query.page == undefined ? 1 : req.query.page;
  async.series({
      articleList: function(callback) {
          xhr.get('shengbei/guanwang_pc/news.html?id=news&page=1&count=999', {}, function(res) {
              callback(null, res.data);
          });
      },
      hotList: function(callback) {
        xhr.get('shengbei/guanwang_pc/hot.html?id=hot&page=1&count=999', {}, function(res) {
            callback(null, res.data);
        });
    }
  }, function(error, result) {
      res.header('Content-Type', 'application/xml');
      res.header('Cache-Control', 'no-cache');
      res.header('Pragma', 'no-cache');
      res.header('Expires', '-1');
      res.render('shengbei/guanwang_pc/sitemap', {
          env: process.env.NODE_ENV,
          articleList: result.articleList == null ? [] : result.articleList,
          hotList: result.hotList == null ? [] : result.hotList,
          nowDate:formateDate(new Date())
      });

  });
}

//2.新闻详情页 ------------pc-----------
app.get('/:name/:id?(\.html)', function (req, res, next) {
  (async function() {
      var name = req.params.name;
      var id = req.params.id;
      var newsData = await httpHelper.get('//webapi.youzu.com/shengbei/newNews');
      var detailData = await httpHelper.get('//webapi.youzu.com/shengbei/'+ name+'/'+ id);
      // console.log(newsData.data)
      res.render("shengbei/guanwang_pc/news_details.html", { newsData: newsData, detailData:detailData,name:name, id:id});


  })()
})
//新闻详情页 ------------pc-----------



//定义错误处理方法
app.use(function(err, req, res, next) {
    console.log(err + '测试')
	  // console.error(err.stack);
	  res.status(500).send('Something broke!');
});

app.use(function(err, req, res, next) {
  console.log("报错日志",err.stack);
  res.status(404).send('Something broke!');
});
;

app.use(function(req, res, next) {
  // 设置所有HTTP请求的超时时间
  req.setTimeout(10000);
  // 设置所有HTTP请求的服务器响应超时时间
  res.setTimeout(10000);
  next();
});


// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
