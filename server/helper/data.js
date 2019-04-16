


//判断是否是json
exports.isJson = function(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	return isjson;
}

//判断是否是对象
exports.isObject = function (obj){
    return Object.prototype.toString.call(obj) === '[object Object]';
}
 
//判断是否是数组
exports.isArray = function (arr) { 
	return Object.prototype.toString.call(arr) === '[object Array]';
}


//判断是否是字符串
exports.isString = function (arr) { 
	return Object.prototype.toString.call(arr) === '[object Array]';
}
  


