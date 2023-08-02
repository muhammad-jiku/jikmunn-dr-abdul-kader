const express = require('express');
const passport = require('passport');
const { signUp, signIn, signOut } = require('../controllers/authController');

const authRoute = express.Router({
  caseSensitive: true,
});

authRoute.route('/signup').post(signUp);
authRoute.route('/signin').post(signIn);
authRoute
  .route('/google')
  // .get(passport.authenticate('google', { scope: ['profile'] }));
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

authRoute.route('/google/callback').get(
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: `${process.env.ERROR_SIGNIN_URL}`,
    successRedirect: `${process.env.SUCCESS_SIGNIN_URL}`,
  }),
  function (req, res) {
    console.log('user is authenticated = ', req.user);
    // Successful authentication, redirect home.
    // googleSignIn(req, res);
    // res.redirect('/');
    res.send('Thank you for signing in!');
  }
);
authRoute.route('/signout').post(signOut);

module.exports = authRoute;
