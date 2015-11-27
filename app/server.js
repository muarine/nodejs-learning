 /**
 * Module dependencies.
 */


var express = require('express');
var offical = require('./app.js');

var site_vhosts=[],vhosts;

// Virtual Hosts
site_vhosts.push(express.vhost('localhost',offical));
//site_vhosts.push(express.vhost('www.qinyh.com',offical));


vhost=express.createServer.apply(this,site_vhosts);

vhost.listen(80);
console.log("Express router Listening on port 80");