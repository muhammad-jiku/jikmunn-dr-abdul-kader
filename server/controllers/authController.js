const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const AsyncError = require('../middlewares/errors/AsyncError');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const cloudinary = require('cloudinary');

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

const getUserDetails = AsyncError(async (req, res) => {
  try {
    const { id } = await req.user;
    const user = await User.findById({
      _id: id,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const updateProfile = AsyncError(async (req, res) => {
  try {
    const { id } = await req.user;
    const { username, avatar, phone, country, state, city, address } =
      await req.body;

    const updatedUserData = {
      username,
      avatar,
      phone,
      country,
      state,
      city,
      address,
    };

    const opts = {
      runValidators: true,
      new: true,
    };

    if (avatar !== '') {
      const user = await User.findById({ _id: id });

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'jikmunn-doctor-abdul-kader/avatars',
        width: 150,
        crop: 'scale',
      });

      updatedUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updatedUserData },
      {
        opts,
      }
    ).exec();

    return res.status(200).json({
      success: true,
      user,
      updatedUserData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

module.exports = {
  signUp,
  signIn,
  googleSignIn,
  signOut,
  getUserDetails,
  updateProfile,
};
