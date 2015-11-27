var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
// Entity Properties

// Schema	Model Entity
var MovieSchema = new Schema({
	name : String,
	alias : [String],
	publish : Date,
	create_date : { type: Date, default: Date.now},
	images :{
		coverSmall:String,
		coverBig:String,
	},
	source :[{
		source:String,
		link:String,
		swfLink:String,
		quality:String,
		version:String,
		lang:String,
		subtitle:String,
		create_date : { type: Date, default: Date.now }
	}]
});
var Movie = mongodb.mongoose.model("Movie",MovieSchema);
var MovieDAO = function(){};

// CRUD
MovieDAO.prototype.findByName = function(name,callback){
	console.log('select name: %d' , name);
	Movie.findOne({'name':name},function(err,obj){
		callback(err,obj);
	});
};

MovieDAO.prototype.save = function(obj,callback){
	var instance = new Movie(obj);
	instance.save(function(err){
		callback(err);
	});
}

MovieDAO.prototype.update = function(obj,callback){
	// var instance = new Move(obj);
	// instance.update(function(err){
	// 	callback(err);
	// });
}

module.exports = new MovieDAO();