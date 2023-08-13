const express = require('express');
const {
  createAdminPrice,
  getAdminAllPrice,
  getAdminPriceDetails,
  updateAdminPriceDetails,
  deleteAdminPriceDetails,
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
priceRoute
  .route('/admin/price/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminPriceDetails)
  .put(isAuthenticated, authorizeAdmin, updateAdminPriceDetails)
  .delete(isAuthenticated, authorizeAdmin, deleteAdminPriceDetails);

module.exports = priceRoute;
