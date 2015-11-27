// 加载依赖库，原来这个类库都封装在connect中，现在需要单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载路由
//var router = require('./routes/index');
//var users = require('./routes/users');

// 创建项目实例
var app = express();

// 定义EJS模版引擎和位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 定义icon图标
app.use(favicon(__dirname + '/public/favicon.ico'));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));



// 匹配路径和路由
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin',require('./routes/admin'));

// var movie = require('./routes/movie');

app.use('/movie',require('./routes/movie'));
app.use('/front',require('./routes/front'));
// app.get('/movie/add',movie.movieAdd);
// app.post('/movie/add',movie.doMovieAdd);
// app.get('/movie/:name',movie.movieAdd);
// app.get('/movie/json/:name',movie.movieJSON);

// 404错误处理 TODO ?????????????????????
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;
