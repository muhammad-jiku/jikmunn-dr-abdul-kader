const express = require('express');
const {
  createService,
  getAdminAllService,
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

module.exports = serviceRoute;
