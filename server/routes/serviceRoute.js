const express = require('express');
const {
  createAdminService,
  getAdminAllService,
  getAdminServiceDetails,
  updateAdminServiceDetails,
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
  .post(isAuthenticated, authorizeAdmin, createAdminService);
serviceRoute
  .route('/admin/services')
  .get(isAuthenticated, authorizeAdmin, getAdminAllService);
serviceRoute
  .route('/admin/service/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminServiceDetails)
  .put(isAuthenticated, authorizeAdmin, updateAdminServiceDetails);

module.exports = serviceRoute;
