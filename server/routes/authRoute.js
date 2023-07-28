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
authRoute.route('/auth/google').get(
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

authRoute.route('/auth/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/signin',
  }),
  googleAuthCallback
);

module.exports = authRoute;
