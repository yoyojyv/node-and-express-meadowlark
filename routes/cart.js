// /cart/*

var express = require('express');
var router = express.Router();

var Product = require('../lib/product');

router.get('/', function (req, res) {
  var cart = req.session.cart || (req.session.cart = []);
  res.render('cart', { cart: cart });
});

router.post('/add', function (req, res, next) {

  var cart = req.session.cart || (req.session.cart = []);
  Product.findOne({ sku: req.body.sku }, function (err, product) {

    if (err) return next(err);
    if (!product) return next(new Error('Unknown product SKU: ' + req.body.sku));
    cart.push({
      product: product,
      guests: req.body.guests || 0,
    });
    res.redirect(303, '/cart');
  });
});

module.exports = router;
