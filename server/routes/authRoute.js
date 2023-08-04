const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/signup').post(signUp);
authRoute.route('/signin').post(signIn);
authRoute.route('/signout').post(signOut);

module.exports = authRoute;
