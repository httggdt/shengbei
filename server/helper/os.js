var os = require('os');

var ip = {
		serviceIp:function(){
			var network = os.networkInterfaces();
			for (var key in network){
				if(key == "eth0" || key == "本地连接" ){
					for(var i = 0; i < network[key].length; i++){
						if(network[key][i].family === 'IPv4'){
							return network[key][i].address;
						}
					}
				}
			}
		},
		getClientIp:function (req) {  
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
}


module.exports = ip