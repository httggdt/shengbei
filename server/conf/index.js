


var yz_conf = {};
//引入环境配置
	if(process.env.NODE_ENV == 'production'){
	yz_conf = require('./pro.conf').default
}else{
	yz_conf = require('./dev.conf').default
}




export default yz_conf