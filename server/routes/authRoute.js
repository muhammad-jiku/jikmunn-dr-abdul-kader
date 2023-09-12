// external import
const express = require('express');
// internal import
const {
  signUp,
  signIn,
  googleSignIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/auth/signup').post(signUp);
authRoute.route('/auth/signin').post(signIn);
authRoute.route('/auth/google').post(googleSignIn);
authRoute.route('/auth/signout').post(signOut);
authRoute.route('/auth/forget-password').post(forgotPassword);
authRoute.route('/auth/reset-password/:token').put(resetPassword);

// exporting module
module.exports = authRoute;
