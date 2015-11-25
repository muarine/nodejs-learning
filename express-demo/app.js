
var express = require('express');
var app = express();

app.get('hello.txt',function(req,res){

	res.send('Hello World');

});

app.get('/',function(req,res){

	res.send('This is Index Page');

});

var server = app.listen(3000,function(req,res){

	console.log('listening on port %d',server.address().port);

});