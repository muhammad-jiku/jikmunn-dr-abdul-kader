const express = require('express');
const {
  getUserDetails,
  updateProfile,
} = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth/AuthHandler');

const userRoute = express.Router({
  caseSensitive: true,
});

userRoute.route('/me').get(isAuthenticated, getUserDetails);
userRoute.route('/me/update').put(isAuthenticated, updateProfile);

module.exports = userRoute;
