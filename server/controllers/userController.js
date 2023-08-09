const AsyncError = require('../middlewares/errors/AsyncError');
const User = require('../models/User');
const cloudinary = require('cloudinary');

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

module.exports = {
  getUserDetails,
  updateProfile,
};
