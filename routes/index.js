var express = require('express');
var router = express.Router();
var fortune = require('../lib/fortune');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home');
});

router.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

module.exports = router;
