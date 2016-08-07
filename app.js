var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var routes = require('./routes/index');
var cartRoutes = require('./routes/cart');

// var jqupload = require('jquery-file-upload-middleware');

var credentials = require('./credentials.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set helper
// @see https://github.com/donpark/hbs#helpers-and-partials
// @see https://github.com/donpark/hbs#extra-scripts-or-styles

var blocks = {};

hbs.registerHelper('extend', function(name, context) {

  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));

  // console.log('option...')
  // console.log(options);
  // if(!_sections) _sections = {}; _sections[name] = options.fn(this); return null;
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});


// set partials (hbs)
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser(credentials.cookieSecret));
app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// flash message middleware
app.use(function(req, res, next){
  // if there's a flash message, transfer
  // it to the context, then clear it
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});


// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
  res.locals.layout = 'layouts/main';
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  console.log(app.get('env') !== 'production' && req.query.test === '1');
  next();
});

require('./route-example');

// mocked weather data
function getWeatherData(){
  return {
    locations: [
      {
        name: 'Portland',
        forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Overcast',
        temp: '54.1 F (12.3 C)',
      },
      {
        name: 'Bend',
        forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Partly Cloudy',
        temp: '55.0 F (12.8 C)',
      },
      {
        name: 'Manzanita',
        forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Light Rain',
        temp: '55.0 F (12.8 C)',
      },
    ],
  };
}

// middleware to add weather data to context
app.use(function(req, res, next){
  if(!res.locals.partials) res.locals.partials = {};
  res.locals.partials.weatherContext = getWeatherData();
  next();
});

// // jQuery File Upload endpoint middleware
// app.use('/upload', function(req, res, next){
//   var now = Date.now();
//   jqupload.fileHandler({
//     uploadDir: function(){
//       return __dirname + '/public/uploads/' + now;
//     },
//     uploadUrl: function(){
//       return '/uploads/' + now;
//     },
//   })(req, res, next);
// });

app.use('/', routes);


var cartValidation = require('./lib/cartValidation.js');

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);


app.use('/cart', cartRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // custom 404 page
// app.use(function(req, res) {
//   // res.type('text/plain');
//   // res.status(404);
//   // res.send('404 - Not Found');
//   res.status(404);
//   res.render('404');
// });
//
// // custom 500 page
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   // res.type('text/plain');
//   // res.status(500);
//   // res.send('500 - Server Error');
//   res.status(500);
//   res.render('500');
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminaate.');
});

module.exports = app;

// test jshint - error like this -> app.js: line 92, col 15, Use '===' to compare with 'null'.
// if (app.thing == null) console.log('bleat!');
