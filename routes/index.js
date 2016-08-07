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

// for now, we're mocking NewsletterSignup:
function NewsletterSignup() {
}

NewsletterSignup.prototype.save = function (cb) {
  cb();
};

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

router.post('/newsletter', function (req, res) {
  var name = req.body.name || '', email = req.body.email || '';

  // input validation
  if (!email.match(VALID_EMAIL_REGEX)) {
    if (req.xhr) return res.json({ error: 'Invalid name email address.' });
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'The email address you entered was  not valid.',
    };
    return res.redirect(303, '/newsletter/archive');
  }

  new NewsletterSignup({ name: name, email: email }).save(function (err) {
    if (err) {
      if (req.xhr) return res.json({ error: 'Database error.' });
      req.session.flash = {
        type: 'danger',
        intro: 'Database error!',
        message: 'There was a database error; please try again later.',
      };
      return res.redirect(303, '/newsletter/archive');
    }

    if (req.xhr) return res.json({ success: true });
    req.session.flash = {
      type: 'success',
      intro: 'Thank you!',
      message: 'You have now been signed up for the newsletter.',
    };
    return res.redirect(303, '/newsletter/archive');
  });
});

router.get('/newsletter/archive', function (req, res) {
  res.render('newsletter/archive');
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

var Product = require('../lib/product');

router.get('/tours/:tour', function (req, res, next) {
  Product.findOne({ category: 'tour', slug: req.params.tour }, function (err, tour) {
    if (err) return next(err);
    if (!tour) return next();
    res.render('tour', { tour: tour });
  });
});

router.get('/adventures/:subcat/:name', function (req, res, next) {
  Product.findOne({
    category: 'adventure',
    slug: req.params.subcat + '/' + req.params.name,
  }, function (err, adventure) {
    if (err) return next(err);
    if (!adventure) return next();
    res.render('adventure', { adventure: adventure });
  });
});

module.exports = router;
