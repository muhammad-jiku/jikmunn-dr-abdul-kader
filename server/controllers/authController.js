const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const AsyncError = require('../middlewares/errors/AsyncError');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const ErrorHandler = require('../middlewares/errors/ErrorHandler');

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

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
      username: username.toString().toLowerCase().split(' ').join(''),
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
    // console.log(error)
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
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const googleSignIn = AsyncError(async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokens?.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const publicId = uuidv4();
  const newUser = {
    googleId: payload?.sub,
    username: payload?.name.toString().toLowerCase().split(' ').join(''),
    email: payload?.email,
    avatar: {
      public_id: publicId,
      url: payload?.picture,
    },
  };

  try {
    let user = await User.findOne({ googleId: payload?.sub });
    let token = null;

    if (user) {
      token = generateToken(user);

      return res.status(200).json({
        success: true,
        data: user,
        token,
      });
    } else {
      user = await User.create(newUser);
      token = generateToken(user);

      return res.status(201).json({
        success: true,
        data: user,
        token,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
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

const forgotPassword = AsyncError(async (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  const { email } = await req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Get Reset Password Token
  const resetToken = crypto.randomBytes(64).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;

  await user.save({
    validateBeforeSave: false,
  });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Dr. Abdul kader website's password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = AsyncError(async (req, res, next) => {
  try {
    const { token } = await req.params;
    const { newPassword, passwordConfirm } = await req.body;

    // Creating Token Hash
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          'Reset Password Token is invalid or has been expired',
          400
        )
      );
    }

    if (newPassword !== passwordConfirm) {
      return next(new ErrorHandler('Password does not password', 400));
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const resetPassToken = await generateToken(user);

    return res.status(200).json({
      success: true,
      data: user,
      resetPassToken,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = {
  signUp,
  signIn,
  googleSignIn,
  signOut,
  forgotPassword,
  resetPassword,
};
