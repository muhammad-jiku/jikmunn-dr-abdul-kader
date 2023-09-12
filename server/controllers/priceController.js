// external import
const cloudinary = require('cloudinary');
// internal imports
const Price = require('../models/Price');
const AsyncError = require('../middlewares/errors/AsyncError');
const ErrorHandler = require('../middlewares/errors/ErrorHandler');

const createAdminPrice = AsyncError(async (req, res) => {
  try {
    const { id } = await req.user;
    const { priceID, title, subTitle, price, diagnostics, priceImg } =
      await req.body;

    const priceData = {
      priceID,
      title,
      subTitle,
      price,
      diagnostics,
    };

    const myCloud = await cloudinary.v2.uploader.upload(priceImg, {
      folder: 'jikmunn-doctor-abdul-kader/prices',
      // width: 150,
      // crop: 'scale',
    });

    priceData.priceImg = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    priceData.user = id;

    const priceTag = await Price.create(priceData);

    return res.status(201).json({
      success: true,
      data: priceTag,
      message: 'Price tag created successfully!',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAllPrices = AsyncError(async (req, res) => {
  try {
    const prices = await Price.find({});

    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminAllPrice = AsyncError(async (req, res) => {
  try {
    const prices = await Price.find({});

    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminPriceDetails = AsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const price = await Price.findById({ _id: id });

    if (!price) {
      return next(new ErrorHandler('Price is not found', 404));
    }

    return res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const updateAdminPriceDetails = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const { priceID, title, subTitle, price, diagnostics, priceImg } =
      await req.body;

    let priceData = await Price.findById({ _id: id });

    if (!priceData) {
      return next(new ErrorHandler('Price details is not found', 404));
    }

    const updatedPriceInfo = {
      priceID,
      title,
      subTitle,
      price,
      diagnostics,
      priceImg,
    };

    const opts = {
      runValidators: true,
      new: true,
    };

    if (priceImg !== '') {
      const priceDataInfo = await Price.findById({ _id: id });

      const imageId = priceDataInfo?.priceImg?.public_id;

      imageId?.length > 0 && (await cloudinary.v2.uploader.destroy(imageId));

      const myCloud = await cloudinary.v2.uploader.upload(priceImg, {
        folder: 'jikmunn-doctor-abdul-kader/prices',
      });

      updatedPriceInfo.priceImg = {
        public_id: myCloud?.public_id,
        url: myCloud?.secure_url,
      };
    }

    priceData = await Price.findByIdAndUpdate(
      { _id: id },
      {
        $set: updatedPriceInfo,
      },
      {
        opts,
      }
    ).exec();

    priceData = await Price.findById({ _id: id });

    return res.status(200).json({
      success: true,
      data: priceData,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const deleteAdminPriceDetails = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const price = await Price.findById({ _id: id });

    if (!price) {
      return next(
        new ErrorHandler(`Price detail does not exist with Id: ${id}`, 400)
      );
    } else {
      const imageId = price?.priceImg?.public_id;
      imageId ? await cloudinary.v2.uploader.destroy(imageId) : null;

      await Price.deleteOne({ _id: id });
    }

    return res.status(200).json({
      success: true,
      message: 'Price deleted successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// exporting modules
module.exports = {
  createAdminPrice,
  getAllPrices,
  getAdminAllPrice,
  getAdminPriceDetails,
  updateAdminPriceDetails,
  deleteAdminPriceDetails,
};
