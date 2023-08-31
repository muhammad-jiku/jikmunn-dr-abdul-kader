require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const ErrorChecker = require('./middlewares/errors/ErrorChecker');
const authRoute = require('./routes/authRoute');
const serviceRoute = require('./routes/serviceRoute');
const userRoute = require('./routes/userRoute');
const priceRoute = require('./routes/priceRoute');
const paymentRoute = require('./routes/paymentRoute');

// app initialize
const app = express();

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.disable('x-powered-by'); // less hackers know about our stack

// displaying welcome message
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome here!',
  });
});

// routing intialize
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', serviceRoute);
app.use('/api/v1', priceRoute);
app.use('/api/v1', paymentRoute);

// Middleware for Errors
app.use(ErrorChecker);

// exporting module
module.exports = app;
