const express = require('express');
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentController');
const { isAuthenticated } = require('../middlewares/auth/AuthHandler');

const paymentRoute = express.Router({
  caseSensitive: true,
});

paymentRoute.route('/payment/process').post(isAuthenticated, processPayment);

paymentRoute.route('/stripeapikey').get(isAuthenticated, sendStripeApiKey);

//
module.exports = paymentRoute;
