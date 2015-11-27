var mysql = require('mysql');
var conn;
function handleError(){

	conn = mysql.createConnection({

		host: 'localhost',
        user: 'nodejs',
        password: '123456',
        database: 'nodejs',
        port: 3306,
        debug:true

	});

	// connect error 2 second retry
	conn.connect(function(err){
		if(err){
			console.log('error when connecting to db:',err);
			setTimeout(handleError,2000);
		}
	});

	conn.connect(function(err){
		console.log('db error' , err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			handleError(err);
		}else{
			throw err;
		}
	});
}

handleError();