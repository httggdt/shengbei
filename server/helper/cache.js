import conf from '../conf'
var redis = require('redis');

/**
 * 封装redis 缓存基本方法
 */

let client = redis.createClient(conf.cache.port, conf.cache.ip);

let cache = {};

var version = 1;



client.on('error', function (err) {
	  console.log('Redis Error ' + err);
});


/**
 * 获取缓存数据
 */
cache.get = function(key){
	key = getKey(key);

	return new Promise ((resolve, reject) => {

		client.get(key, function(err, reply) {
		    if(err){
		    	resolve(false);
		    }else{
		    	resolve(reply);
		    }
        });
    });

}

/**
 * 设置缓存数据
 * @param key 缓存key
 * @param val 缓存数据   string
 * @param time 缓存时间 0 标示永久有效
 */
cache.set = function(key,val ,time = 0){
	key = getKey(key);

	client.set(key, val,'EX' ,time);

	return true;
}


function getKey(key){
	return "node:" + key;
}


export default cache
