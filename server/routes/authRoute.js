const express = require('express');
const {
  signUp,
  signIn,
  googleSignIn,
  updatePassword,
  signOut,
} = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth/AuthHandler');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/auth/signup').post(signUp);
authRoute.route('/auth/signin').post(signIn);
authRoute.route('/auth/google').post(googleSignIn);
authRoute
  .route('/auth/me/update-password')
  .put(isAuthenticated, updatePassword);
authRoute.route('/auth/signout').post(signOut);

module.exports = authRoute;
