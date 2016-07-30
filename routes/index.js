var express = require('express');
var router = express.Router();
var formidable = require('formidable');
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

router.get('/jquery-test', function (req, res) {
  res.render('jquery-test');
});

router.get('/nursery-rhyme', function (req, res) {
  res.render('nursery-rhyme');
});

router.get('/data/nursery-rhyme', function (req, res) {
  res.json({
    animal: 'squirrel',
    bodyPart: 'tail',
    adjective: 'bushy',
    noun: 'heck',
  });
});

router.get('/newsletter', function (req, res) {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter', { csrf: 'CSRF token goes here' });
});

router.post('/process', function (req, res) {
  // console.log('Form (from querystring): ' + req.query.form);
  // console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  // console.log('Name (from visible form field): ' + req.body.name);
  // console.log('Email (from visible form field): ' + req.body.email);
  // res.redirect(303, '/thank-you');
  if (req.xhr || req.accepts('json,html') === 'json') {
    // if there were an error, we would send { error: 'error description' }
    res.send({ success: true });
  } else {
    // if there were an error, we would redirect to an error page
    res.redirect(303, '/thank-you');
  }

});

router.get('/thank-you', function (req, res) {
  res.render('thank-you');
});

router.get('/contest/vacation-photo', function (req, res) {
  var now = new Date();
  res.render('contest/vacation-photo', {
    year: now.getFullYear(), month: now.getMonth(),
  });
});

router.get('/contest/vacation-photo-jqfu', function (req, res) {
  var now = new Date();
  res.render('contest/vacation-photo-jqfu', {
    year: now.getFullYear(), month: now.getMonth(),
  });
});

router.post('/contest/vacation-photo/:year/:month', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.redirect(303, '/error');
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    res.redirect(303, '/thank-you');
  });
});

router.post('/contest/vacation-photo-jqfu/:year/:month', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.redirect(303, '/error');
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    res.redirect(303, '/thank-you');
  });
});

module.exports = router;
