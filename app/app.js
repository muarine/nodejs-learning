/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var fs=require('fs');

// Configuration
console.log=function(obj){
    log(obj,true);
}

var oldconsole=console.log;

log=function(obj,error){
    if(process.platform!="win32"){
        var color=(error)?"33[1;31m":"33[1;32m";
        process.stdout.write(color);

        oldconsole(obj);

        process.stdout.write("33[0m");

    }else{

        oldconsole(obj);

    }

}




app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public')); //注意顺序，为了能够用到404，要把这个提前。
  app.use(app.router);
});



app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  log("Warning: Server in Development Mode, add NODE_ENV=production",true);
});



app.configure('production', function(){
  app.use(express.errorHandler());
  log("Production Mode");
});



// Read JSON files
//这里出现过一个非常恶心的bug，我们发现我们拿windows记事本产生的json文件node.js解析会有问题，于是去掉第一个字节。为了保证安全，文件也上来加了一个回车。
//由于我们是一上来只解析一次，所以我们采用了同步方式

var info=JSON.parse(fs.readFileSync('chinese.json', 'utf8').substr(1));
var routes=JSON.parse(fs.readFileSync('router.json','utf8').substr(1));


// Start router
var    startRouter=function(path){
        app.get(route, function(req,res){
            //console.log("Connect to "+path);
            var page=info[routes[path].data];
            res.render(routes[path].template,page);//最核心的一句
        });
};



for(route in routes){//如果直接for循环而不是调用函数，你就会发现route永远是最后一个
    startRouter(route);
}



//File not found
app.get('/*', function(req, res){
        res.render('404',{status: 404,
        title:'404 - 文件未找到'});
});


try{
app.listen(3000);
log("Express server listening on port 3000");
}catch(e){
    log("Error: "+e.message,1);
}