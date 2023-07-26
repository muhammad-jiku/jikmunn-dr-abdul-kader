const express = require('express');
const passport = require('passport');
const {
  signUp,
  signIn,
  googleAuthCallback,
} = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/signup').post(signUp);
authRoute.route('/signin').post(signIn);
authRoute.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
authRoute.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  googleAuthCallback
);

module.exports = authRoute;
