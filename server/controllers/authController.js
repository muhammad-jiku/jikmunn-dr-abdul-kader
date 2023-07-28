const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');

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
  const { username, email, password } = await req.body;

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

const signIn = async (req, res) => {
  const { email, password } = await req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token and send it in the response
    const token = generateToken(user);
    return res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const googleAuthCallback = async (req, res) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://www.example.com/auth/google/callback',
      },
      async function (accessToken, refreshToken, profile, cb) {
        const publicId = uuidv4();
        console.log('profile: ', profile);
        //  console.log('public id: ', publicId)
        console.log('public id: ', publicId());
        const newUser = {
          googleId: profile.id,
          username: profile.displayName.toLowerCase(),
          email: profile.emails[0].value,
          avatar: {
            public_id: publicId(),
            url: profile.photos[0].value,
          },
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            await generateToken(user);
            done(null, user);
          } else {
            user = await User.create(newUser);
            await generateToken(user);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

module.exports = {
  signUp,
  signIn,
  googleAuthCallback,
};
