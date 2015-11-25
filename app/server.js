var path = require('path');
var express =require('express');
var app = express();
var admin =require('./router/admin');


app.locals.title = 'My App';
//app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.send("Index");
});

var server = app.listen(3000);

app.use('/admin',admin);
