// internal import
const ErrorHandler = require('./ErrorHandler');

// exporting module
module.exports = (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong Mongodb Id error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    // console.log(message);
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    // console.log(message);
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `;
    // console.log(message);
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `;
    // console.log(message);
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    // message: err ,
    message: err.stack,
    // message: err.message,
  });
};
