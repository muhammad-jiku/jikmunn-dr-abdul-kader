// external import
const express = require('express');
// internal imports
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');
const {
  createAdminService,
  getAllServices,
  getServiceDetails,
  getAdminAllService,
  getAdminServiceDetails,
  updateAdminServiceDetails,
  deleteAdminServiceDetails,
} = require('../controllers/serviceController');

const serviceRoute = express.Router({
  caseSensitive: true,
});

serviceRoute
  .route('/admin/create-service')
  .post(isAuthenticated, authorizeAdmin, createAdminService);
serviceRoute.route('/services').get(getAllServices);
serviceRoute.route('/service/:title').get(getServiceDetails);
serviceRoute
  .route('/admin/services')
  .get(isAuthenticated, authorizeAdmin, getAdminAllService);
serviceRoute
  .route('/admin/service/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminServiceDetails)
  .put(isAuthenticated, authorizeAdmin, updateAdminServiceDetails)
  .delete(isAuthenticated, authorizeAdmin, deleteAdminServiceDetails);

// exporting module
module.exports = serviceRoute;
