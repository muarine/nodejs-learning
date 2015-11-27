var mongoose = require('mongoose');

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'muarine',
  pass: '123456'
}

mongoose.connect('mongodb://127.0.0.1/nodejs',options);

// OutPut Model 
exports.mongoose = mongoose;