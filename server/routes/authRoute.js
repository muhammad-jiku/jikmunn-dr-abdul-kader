const express = require('express');
const {
  signUp,
  signIn,
  googleSignIn,
  signOut,
  getUserDetails,
  updateProfile,
  updatePassword,
} = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth/AuthHandler');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/signup').post(signUp);
authRoute.route('/signin').post(signIn);
authRoute.route('/google').post(googleSignIn);
authRoute.route('/signout').post(signOut);
authRoute.route('/me').get(isAuthenticated, getUserDetails);
authRoute.route('/me/update').put(isAuthenticated, updateProfile);
authRoute.route('/me/update-password').put(isAuthenticated, updatePassword);

module.exports = authRoute;
