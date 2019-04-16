import {
    Router
} from 'express';
var async = require('async');
import request from 'request';
import httpHelper from '../helper/http';
import cache from '../helper/cache';
import conf from '../conf/pro.conf';
import apiCommon from '../apiCommon/apiCommon.js';
const api = apiCommon.api;

var bodyParser = require('body-parser');
const router = Router()
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


export default router