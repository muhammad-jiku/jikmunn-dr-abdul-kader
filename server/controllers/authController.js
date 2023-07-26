const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: `${process.env.EXPIRES_IN}s`,
    }
  );
};

const googleAuthCallback = (req, res) => {
  // This callback function will handle the Google OAuth authentication callback
  // Extract the user data from req.user obtained by Passport.js
  const { id, displayName, emails } = req.user;
  const email = emails[0].value;

  // Check if the user already exists in the database based on the Google ID
  User.findOne({ googleId: id }, async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }

    if (user) {
      // User already exists, generate a JWT token and send it as a response
      const token = generateToken(user);
      return res.redirect(`/signin?token=${token}`);
      //   return res.redirect(`http://localhost:3000/google-auth-success/${token}`);
    } else {
      // User does not exist, create a new user with the Google profile data
      const newUser = new User({
        googleId: id,
        email,
        username: displayName.toLowerCase(),
      });

      try {
        await newUser.save();
        // Generate a JWT token and send it as a response
        const token = generateToken(newUser);
        return res.redirect(`/signin?token=${token}`);
        // return res.redirect(
        //   `http://localhost:3000/google-auth-success/${token}`
        // );
      } catch (error) {
        return res.status(500).json({
          message: 'Internal server error',
        });
      }
    }
  });
};

module.exports = {
  googleAuthCallback,
};
