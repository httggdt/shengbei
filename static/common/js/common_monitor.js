function dataManagementFunc(env,path,mark) {
    if (env == "production") {
    	if(mark){
        	$.get('https://uapi.youzu.com/stat/push?appid=hh.youzu.com&path='+path+'&mark='+mark);
    	}
    	else {
    		$.get('https://uapi.youzu.com/stat/push?appid=hh.youzu.com&path='+path);
    	}
    }
}


// 打点的方法
function bongSendClick(gamePrefix, eventId, posId) {
	var custom = arguments[3] ? arguments[3] : "";
	var eventType = arguments[4] ? arguments[4] : "click";
	
	// for(var i=0;i<arguments.length;i++) {
	// 	console.log(arguments[i])
	// }

	// 打百度的
	_hmt.push(['_trackEvent', 'game', posId, gamePrefix + '_' + posId]);
	// 打游族的
	dp_data_push(eventId, gamePrefix + '_' + posId, custom, eventType);
}
