// external import
const express = require('express');
// internal imports
const { isAuthenticated } = require('../middlewares/auth/AuthHandler');
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentController');

const paymentRoute = express.Router({
  caseSensitive: true,
});

paymentRoute.route('/payment/process').post(isAuthenticated, processPayment);
paymentRoute.route('/stripeapikey').get(isAuthenticated, sendStripeApiKey);

// exporting module
module.exports = paymentRoute;
