var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	user:'nodejs',
	password:'123456',
	port:3306,
	database:'nodejs'
	debug:true;
});

var selectSQL = 'select * from t_user limit 10';

pool.getConnecting(function(err,conn){
	if(err) console.log("POOL ==>" , err);
	conn.query(selectSQL,function(err,rows){
		if(err) console.log(err);
		console.log("SELECT ==>");
		for(var i in rows){
			console.log(row[i]);
		}
		conn.release();
	});
});