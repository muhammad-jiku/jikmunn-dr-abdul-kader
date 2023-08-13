const express = require('express');
const {
  createAdminPrice,
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
  .post(isAuthenticated, authorizeAdmin, createAdminPrice);
priceRoute
  .route('/admin/prices')
  .get(isAuthenticated, authorizeAdmin, getAdminAllPrice);

module.exports = priceRoute;
