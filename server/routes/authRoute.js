const express = require('express');
const { signUp, signIn } = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/signup').post(signUp);
authRoute.route('/signin').post(signIn);

module.exports = authRoute;
