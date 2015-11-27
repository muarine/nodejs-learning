var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs');

// OutPut Model 
exports.mongoose = mongoose;