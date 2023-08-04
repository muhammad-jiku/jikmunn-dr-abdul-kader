require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');
const authRoute = require('./routes/authRoute');
const { googleSignIn } = require('./controllers/authController');

// app initialize
const app = express();
googleSignIn();

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
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by'); // less hackers know about our stack

// displaying welcome message
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome here!',
  });
});

// routing intialize
app.use('/api/v1/auth', authRoute);

// middleware for errors

// exporting module
module.exports = app;
