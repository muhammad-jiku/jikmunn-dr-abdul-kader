const express = require('express');
const {
  signUp,
  signIn,
  googleSignIn,
  signOut,
} = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/auth/signup').post(signUp);
authRoute.route('/auth/signin').post(signIn);
authRoute.route('/auth/google').post(googleSignIn);
authRoute.route('/auth/signout').post(signOut);

module.exports = authRoute;
