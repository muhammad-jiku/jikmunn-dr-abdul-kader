// external import
const express = require('express');
// internal imports
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');
const {
  createAdminPrice,
  getAllPrices,
  getAdminAllPrice,
  getAdminPriceDetails,
  updateAdminPriceDetails,
  deleteAdminPriceDetails,
} = require('../controllers/priceController');

const priceRoute = express.Router({
  caseSensitive: true,
});

priceRoute
  .route('/admin/create-price')
  .post(isAuthenticated, authorizeAdmin, createAdminPrice);
priceRoute.route('/prices').get(getAllPrices);
priceRoute
  .route('/admin/prices')
  .get(isAuthenticated, authorizeAdmin, getAdminAllPrice);
priceRoute
  .route('/admin/price/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminPriceDetails)
  .put(isAuthenticated, authorizeAdmin, updateAdminPriceDetails)
  .delete(isAuthenticated, authorizeAdmin, deleteAdminPriceDetails);

// exporting module
module.exports = priceRoute;
