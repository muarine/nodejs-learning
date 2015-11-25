var express = require('express');
var admin = express.Router();

/* Index admin page */
admin.get('/', function(req, res, next) {
  res.render('admin/login',{title:'智慧图公众号第三方平台',description:'AAABBBCCC'});
});

module.exports = admin;