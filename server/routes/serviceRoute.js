const express = require('express');
const {
  createService,
  getAdminAllService,
  getAdminServiceDetails,
  adminUpdateServiceDetails,
} = require('../controllers/serviceController');
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');

const serviceRoute = express.Router({
  caseSensitive: true,
});

serviceRoute
  .route('/admin/create-service')
  .post(isAuthenticated, authorizeAdmin, createService);
serviceRoute
  .route('/admin/services')
  .get(isAuthenticated, authorizeAdmin, getAdminAllService);
serviceRoute
  .route('/admin/service/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminServiceDetails)
  .put(isAuthenticated, authorizeAdmin, adminUpdateServiceDetails);

module.exports = serviceRoute;
