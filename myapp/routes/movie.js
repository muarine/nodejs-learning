var Movie = require('./../models/Movie.js');
// get
exports.movieAdd = function(req,res){
	console.log(req.params.name);
	if(req.params.name){
		return res.render('movie',{
			title:req.params.name + '|Movie|Manager|movie me',
			label:'Edit Movie:' + req.params.name,
			movie:req.params.name

		});
	}else{
		return res.render('movie',{
			title: '新增加|电影|管理|moive.me',
			label:'新增加电影',
			movie:false
		});
	}


};
// post
exports.doMovieAdd = function(req,res){
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
};

exports.movieJSON = function(req,res){
	console.log(req.params);
		Movie.findByName(req.params.name,function(err,obj){
			console.log(err);
			if(err){
				res.send('error:' + err);
			}else{
				res.send(obj);	
			}
		});
};