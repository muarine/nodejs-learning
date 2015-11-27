var Movie = require('./../models/Movie.js');
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Movie Time: ', Date.now());
	next();
})

router.get('/add',function(req,res,next){
	// handler
	console.log('start monitor');
	next();

},function(req,res){
	return res.render('movie',{
		title: '新增加|电影|管理|moive.me',
		label:'新增加电影',
		movie:false
	});

});
router.get('/:name',function(req,res){
	console.log(req.params.name);
	return res.render('movie',{
		title:req.params.name + '|Movie|Manager|movie me',
		label:'Edit Movie:' + req.params.name,
		movie:req.params.name
	});
});


router.post('/add',function(req , res){
	console.log(JSON.parse(req.body.content));
	var json = JSON.parse(req.body.content);
	if(json._id){ // update
		//Movie.update()
	}else{
		Movie.save(json,function(err){
			console.log(err);
			if(err){
				res.send({'success':false,'err':err});
			}else{
				res.send({'success':true});
			}
		});
	}
});

router.get('/json/:name',function(req,res){
	console.log(req.params)
	var query={};
	if(req.query.name){
		query['name'] = new RegExp(req.query.name); // query param
	}

	Movie.findByName(query,function(err,list){
		console.log(list);
		console.log(JSON.stringify(list));
		return res.render('queryMovie',{title:'Movie Title',label:'Head',movieList:JSON.stringify(list)});
	});

	// Movie.findByName(req.params.name,function(err,obj){
	// 	console.log(err);
	// 	if(err){
	// 		res.send('error:' + err);
	// 	}else{
	// 		res.send(obj);	
	// 	}
	// });
});


module.exports = router;


// get
// exports.movieAdd = function(req,res){
// 	console.log(req.params.name);
// 	if(req.params.name){
// 		return res.render('movie',{
// 			title:req.params.name + '|Movie|Manager|movie me',
// 			label:'Edit Movie:' + req.params.name,
// 			movie:req.params.name

// 		});
// 	}else{
// 		return res.render('movie',{
// 			title: '新增加|电影|管理|moive.me',
// 			label:'新增加电影',
// 			movie:false
// 		});
// 	}


// };
// // post
// exports.doMovieAdd = function(req,res){
// 	console.log(JSON.parse(req.body.content));
// 	var json = JSON.parse(req.body.content);
// 	if(json._id){ // update
// 		//Movie.update()
// 	}else{
// 		Movie.save(json,function(err){
// 			console.log(err);
// 			if(err){
// 				res.send({'success':false,'err':err});
// 			}else{
// 				res.send({'success':true});
// 			}
// 		});
// 	}
// };

// exports.movieJSON = function(req,res){
// 	console.log(req.params);
// 	Movie.findByName(req.params.name,function(err,obj){
// 		console.log(err);
// 		if(err){
// 			res.send('error:' + err);
// 		}else{
// 			res.send(obj);	
// 		}
// 	});
// };