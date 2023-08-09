const express = require('express');
const { createService } = require('../controllers/serviceController');
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

module.exports = serviceRoute;
