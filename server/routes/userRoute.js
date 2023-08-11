const express = require('express');
const {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAdminAllUser,
  getAdminSingleUser,
  adminUpdateUserRole,
} = require('../controllers/userController');
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');

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
  .put(isAuthenticated, authorizeAdmin, adminUpdateUserRole);

module.exports = userRoute;
