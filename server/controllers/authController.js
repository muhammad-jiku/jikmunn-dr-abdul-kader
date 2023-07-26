const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token and send it in the response
    const token = generateToken(newUser);
    return res.status(201).json({
      success: true,
      data: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
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
  signUp,
  googleAuthCallback,
};
