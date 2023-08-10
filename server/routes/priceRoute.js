const express = require('express');
const {
  createPrice,
  getAdminAllPrice,
} = require('../controllers/priceController');
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');

const priceRoute = express.Router({
  caseSensitive: true,
});

priceRoute
  .route('/admin/create-price')
  .post(isAuthenticated, authorizeAdmin, createPrice);
priceRoute
  .route('/admin/prices')
  .get(isAuthenticated, authorizeAdmin, getAdminAllPrice);

module.exports = priceRoute;
