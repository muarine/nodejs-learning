var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

router.get('aa(cd)*',function(res,res){

	console.log('http method: %d',res.METHOD);
	res.send('Admin Index Page');

})


module.exports = router;