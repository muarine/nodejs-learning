var express = require('express');
var routers = express.Router();

routers.use(function timeLog(req,res,next){
	console.log('Front Handler')
	next();
});

routers.get('/select',function(req,res){
	var selects = {
		data:[
			{
				'code':'kehuan',
				'name':'科幻'
			},
			{
				'code':'juqing',
				'name':'剧情'
			},
			{
				'code':'fanzui',
				'name':'犯罪'
			},
			{
				'code':'xibu',
				'name':'西部'
			},
			{
				'code':'aiqing',
				'name':'爱情'
			},
		]
	};
	// var selects = {};
	// selects.push({name:'爱情',code:'aiqing'})
		res.render('select',
		{
			'title':'aaa',
			search:{type:'剧情'},
			data:selects
		});
	});

module.exports = routers;
