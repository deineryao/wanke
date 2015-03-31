var express = require('express');
var router = express.Router();
var token = 'dianyingren';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res) {
    var echostr = req.query.echostr;
    res.end(echostr);
});


module.exports = router;
