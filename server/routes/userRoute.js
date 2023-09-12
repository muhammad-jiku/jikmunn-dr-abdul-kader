// external import
const express = require('express');
// internal imports
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');
const {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAdminAllUser,
  getAdminSingleUser,
  updateAdminUserRole,
  deleteAdminUser,
} = require('../controllers/userController');

const userRoute = express.Router({
  caseSensitive: true,
});

userRoute.route('/me').get(isAuthenticated, getUserDetails);
userRoute.route('/me/update').put(isAuthenticated, updateProfile);
userRoute.route('/me/update-password').put(isAuthenticated, updatePassword);
userRoute
  .route('/admin/users')
  .get(isAuthenticated, authorizeAdmin, getAdminAllUser);
userRoute
  .route('/admin/user/:id')
  .get(isAuthenticated, authorizeAdmin, getAdminSingleUser)
  .put(isAuthenticated, authorizeAdmin, updateAdminUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteAdminUser);

// exporting module
module.exports = userRoute;
