
function createServer(someFunction,req,res){
	
//	method();
	someFunction(req,res);
}

// execute(say,"muarine");
createServer(function(request,response){
	console.log("request:"+request+" \\r response:"+response);
	
},"request","response");
