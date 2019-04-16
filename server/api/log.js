

import { Router } from 'express'
var ip = require('../helper/os')


var logger = require('fluent-logger').createFluentSender('log.hd-.application', {
   host: '10.7.32.240',
   port: 24224,
   timeout: 3.0,
   reconnectInterval: 600000 // 10 minutes
});
logger.on('error', (error) => {
  console.log('fluent-logger error',error);
});
logger.on('connect', () => {
  console.log('fluent-logger','connected!');
});

const router = Router()

var json =  {
//	    "message": "这是日志消息", //日志消息
////	    "category": "yii\\db\\Command::query",   //日志分类
//	    "level": "info",	//日志等级
////	    "timeline": "", //客户端时间
//	    "server_ip": "10.6.55.3",   //服务器ip
//	    "clinet_ip": "58.246.221.75", //客户端ip
	  }
/* GET users listing. */
router.get('/log', function (req, res, next) {
	console.log('/log')
	var message = {}
	message.level = req.query.level
	message.host = req.host
	message.app_id = req.query.app_id
	message.message = req.query.message + "-----" + req.headers['user-agent']
//	message.message = '这是日志消息'
	//message.category = "log.hd.web"
	//message.timeline = req.query.timeline
	message.clinet_ip = ip.getClientIp(req)
	var message = formatMessage(message)
	
  logger.emit('web',message);
  res.json({code:100})
})

//格式化消息
function formatMessage(message){
	json.server_ip = ip.serviceIp()
	json.level = message.level
	json.app_id = message.app_id
	json.host = message.host
//	json.category = message.category
//	json.timeline = message.timeline
	json.message = message.message
	json.clinet_ip = message.clinet_ip
	console.log(json)
	return json;
}



export default router
