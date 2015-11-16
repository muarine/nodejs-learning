function route(handle,request,response,pathname,postData) {
	console.log('Route to route a request for ' + pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname](request,response,pathname,postData);
	}else{
		console.log("No request handler found for " + pathname);
		response.writeHead(200, {"Content-Type": "text/plain"});
                response.write('404 Page Not Found');
		response.end();
	}
}

exports.route = route;

