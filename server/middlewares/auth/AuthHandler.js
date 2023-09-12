// external import
const jwt = require('jsonwebtoken');
// internal imports
const User = require('../../models/User');
const AsyncError = require('../errors/AsyncError');
const ErrorHandler = require('../errors/ErrorHandler');

const isAuthenticated = AsyncError(async (req, res, next) => {
  const authHeader = await req?.headers?.authorization;
  // console.log('Auth header........', authHeader);
  if (!authHeader) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  }
  const token = await authHeader?.split(' ')[1];
  // console.log('token.........', token);
  if (!token) {
    // return next(new ErrorHandler('Please Login to access this resource', 401));
    return next(new ErrorHandler('Please Login to access this resource', 400));
  } else {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      // console.log(decoded);
      if (err) {
        // console.log(err);
        return next(new ErrorHandler('Access to this route is forbidden', 403));
      }
      req.decoded = decoded;
      // console.log('decoded: ', decoded);
      req.user = await User.findById(decoded.id);
      // console.log('user', req.user);

      next();
    });
  }
});

const authorizeAdmin = AsyncError(async (req, res, next) => {
  if (req.user?.role === 'Admin') {
    next();
  } else {
    return next(
      new ErrorHandler(
        `Role: ${req.user.role} is not allowed to access this resouce `,
        403
      )
    );
  }
});

// exporting modules
module.exports = {
  isAuthenticated,
  authorizeAdmin,
};
