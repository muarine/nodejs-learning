// nodejs自带的http模块

var http = require("http") , url = require("url");

//var request = null,response = null;
function start(route,handle){
	// 创建server对象，监听端口8888
	http.createServer(onRequest).listen(8888);
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("server request on " + pathname);
		//request监听 data和 end 
		var postData = "";
		// 文件上传时，如果指定字符编码utf8会导致工具formidable无法解析文件
		//request.setEncoding("utf8");
		route(handle,request,response,pathname,postData);
		// nodejs 会将post提交的数据分割成小的数据块分别提交
		//request.addListener("data",function(postDataChunk){
		//	postData = postDataChunk;
		//	console.log("Received POST data chunk '" + postDataChunk + "'.");
		//});
		// end事件回调表示请求已提交完所有的数据
		//request.addListener("end",function(){
		//	route(handle,response,pathname,postData);
		//});
		// 从服务层转交给路由层
		//route(handle,response,pathname);
		//response.writeHead(200, {"Content-Type": "text/plain"});
		//response.write(content);
		//response.end();
	}

}

exports.start = start;
