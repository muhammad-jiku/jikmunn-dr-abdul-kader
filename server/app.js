 
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
 

// app initialize
const app = express();

// cors config
// const corsConfig = {
//   origin: true,
//   // origin: 'http://localhost:3000/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// };

// app.options('*', cors(corsConfig));
// app.use(cors(corsConfig));
// // app.options('*', cors());
// // app.use(cors(origin, 'http://localhost:3000/'));
// app.use(express.json());

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.disable('x-powered-by'); // less hackers know about our stack

// displaying welcome message
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome here!',
  });
});

// routing intialize


// middleware for errors

// exporting module
module.exports = app;