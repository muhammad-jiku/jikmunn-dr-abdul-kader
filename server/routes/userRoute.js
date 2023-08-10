const express = require('express');
const {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAllUser,
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
  .get(isAuthenticated, authorizeAdmin, getAllUser);

module.exports = userRoute;
