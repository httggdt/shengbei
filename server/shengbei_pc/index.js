import { Router } from 'express';
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


// 更改监听的路由

function getClientIp(req) {
	return req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
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



export default router