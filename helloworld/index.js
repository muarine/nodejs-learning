var server = require('./server');
var router = require('./router');

var requestHandlers = require('./requestHandlers');

// 注册路由
var handle = {}
//handle["/"] = requestHandlers.start;
//handle["/start"] = requestHandlers.start;
//handle["/upload"] = requestHandlers.upload;
//handle["/show"] = requestHandlers.show;

// 改进
for(var propertyName in requestHandlers){
	handle["/"+propertyName] = requestHandlers[propertyName];
}

//console.log("路由映射表:" + handle["/"]);

server.start(router.route,handle);
