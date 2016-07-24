var express = require('express');
var router = express.Router();
var fortune = require('../lib/fortune');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home');
});

router.get('/about', function (req, res) {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js',
  });
});

router.get('/tours/hood-river', function (req, res) {
  res.render('tours/hood-river');
});

router.get('/tours/oregon-coast', function (req, res) {
  res.render('tours/oregon-coast');
});

router.get('/tours/request-group-rate', function (req, res) {
  res.render('tours/request-group-rate');
});

module.exports = router;
