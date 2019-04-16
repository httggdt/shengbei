import verification from './data'
import request from 'request'



let httpHelper = {
		get:(url,data)=>{
		    return new Promise ((resolve, reject) => {
		        request.get({
		            url: url,
		            method: "get",
		            json: true,
		            headers: {
		                "content-type": "application/json",
		            },
		            body: data
		        },function(err,response,body){
		            // console.log('返回结果：',data,body);
		            if(!err && response.statusCode == 200){
		                if(body!=='null'){
		                	//解析json    JSON.stringify(data)  转换成json
		                	if(verification.isString(body)){
		                		body = JSON.parse(data);
		                	}
		                    resolve(body);
		                }
		            }
		            resolve(false);
		        });    
		    });
		},
		post:(url,data) =>{
		    return new Promise ((resolve, reject) => {
		        request.post({
		            url: url,
		            method: "post",
		            json: true,
		            headers: {
		                "content-type": "application/x-www-form-urlencoded",
		            },
		            body: data
		        },function(err,response,body){
		            // console.log('返回结果：',data,body);
		            if(!err && response.statusCode == 200){
		                if(body!=='null'){
		                	//解析json    JSON.stringify(data)  转换成json
		                	if(verification.isString(body)){
		                		body = JSON.parse(data);
		                	}
		                    resolve(body);
		                }
		            }
		            resolve(false);
		        });    
		    });
		
		},
}

export default httpHelper



