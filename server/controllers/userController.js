const AsyncError = require('../middlewares/errors/AsyncError');
const User = require('../models/User');
const cloudinary = require('cloudinary');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../middlewares/errors/ErrorHandler');

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

      const imageId = user?.avatar?.public_id;

      imageId?.length > 0 && (await cloudinary.v2.uploader.destroy(imageId));

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

    let user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updatedUserData },
      {
        opts,
      }
    ).exec();

    user = await User.findById({ _id: id });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const updatePassword = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.user;
    const { oldPassword, newPassword, passwordConfirm } = await req.body;

    const user = await User.findById({ _id: id }).select('+password');

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Old password is incorrect', 400));
    }

    if (newPassword !== passwordConfirm) {
      return next(new ErrorHandler('Password does not match', 400));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminAllUser = AsyncError(async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminSingleUser = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const user = await User.findById({ _id: id });

    if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${id}`, 404));
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const updateAdminUserRole = AsyncError(async (req, res) => {
  try {
    const { id } = await req.params;
    const { username, email, role } = await req.body;
    const userData = {
      username,
      email,
      role,
    };
    const opts = {
      runValidators: true,
      new: true,
    };

    let user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: userData },
      {
        opts,
      }
    ).exec();

    user = await User.findById({ _id: id });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const deleteAdminUser = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const user = await User.findById({ _id: id });

    if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${id}`, 400));
    } else {
      const imageId = user?.avatar?.public_id;
      imageId ? await cloudinary.v2.uploader.destroy(imageId) : null;

      await User.deleteOne({ _id: id });
    }

    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  getUserDetails,
  updateProfile,
  updatePassword,
  getAdminAllUser,
  getAdminSingleUser,
  updateAdminUserRole,
  deleteAdminUser,
};
