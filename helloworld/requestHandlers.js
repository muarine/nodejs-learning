//var exec = require("child_process").exec;
var querystring = require("querystring"),
	fs = require('fs'),
	formidable = require('formidable');

function start(request,response,pathname,postData) {
  console.log("handler '" + pathname + "' was called.");

  //exec("find /",
  //  { timeout: 10000, maxBuffer: 20000*1024 },
  //  function (error, stdout, stderr) {
  //    response.writeHead(200, {"Content-Type": "text/plain"});
  //    response.write(stdout);
  //    response.end();
  //  });
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="files" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(request,response,pathname,postData) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.uploadDir = 'upload';
  form.parse(request, function(error, fields, files) {
	//console.log(request.files);
	// 涉及到文件移动和复制，特别是跨磁盘的操作所以会报错。    
	fs.renameSync(files.upload.path, "upload/test.png");
	//var is = fs.createReadStream(files.upload.path);
	//var os = fs.createWriteStream("upload/test.png");
	//is.pipe(os);
	//is.on('end',function(){fs.unlinkSync(files.upload.path)});

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
  //console.log("handler '" + pathname + "' was called.");
  //response.writeHead(200, {"Content-Type": "text/plain"});
  //response.write("You Send data: " + querystring.parse(postData).text);
  //response.end();
}

function show(request,response,pathname, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("upload/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
