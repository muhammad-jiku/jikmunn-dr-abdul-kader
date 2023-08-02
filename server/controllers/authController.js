const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const AsyncError = require('../middlewares/errors/AsyncError');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');

const signUp = AsyncError(async (req, res) => {
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
    const user = await newUser.save();
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const signIn = AsyncError(async (req, res) => {
  const { email, password } = await req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid User',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user);
    return res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const googleSignIn = AsyncError(async (req, res) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
        scope: ['profile', 'email'],
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log('profile : ', profile);
        const publicId = uuidv4();

        const newUser = {
          googleId: profile.id,
          username: profile.displayName
            .toString()
            .toLowerCase()
            .split(' ')
            .join(''),
          email: profile.emails[0].value,
          avatar: {
            public_id: publicId,
            url: profile.photos[0].value,
          },
        };

        try {
          let user = await User.findOne({ googleId: profile.id });
          let token = null;

          if (user) {
            token = await generateToken(user);
            console.log('generated token...', token);

            cb(null, user);
            res.status(200).json({
              success: true,
              data: user,
              token,
            });
          } else {
            user = await User.create(newUser);
            token = await generateToken(user);
            console.log('generated token...', token);

            cb(null, user);
            res.status(201).json({
              success: true,
              data: user,
              token,
            });
          }

          console.log('user profile', user);
          console.log('user profile..', user[0]);
          if (user && user[0]) {
            return cb(null, user && user[0]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    console.log('Serializing user:', user);
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
      console.log('Error deserializing', err);
      cb(err, null);
    });

    console.log('DeSerialized user', user);

    if (user) cb(null, user);
  });
});

const signOut = AsyncError(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Signed Out Successfully!',
  });
});

module.exports = {
  signUp,
  signIn,
  googleSignIn,
  signOut,
};
