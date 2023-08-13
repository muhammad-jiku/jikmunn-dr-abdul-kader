const AsyncError = require('../middlewares/errors/AsyncError');
const cloudinary = require('cloudinary');
const Price = require('../models/Price');
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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminPriceDetails = AsyncError(async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findById({ _id: id });

    if (!price) {
      return new ErrorHandler('Price is not found', 404);
    }

    return res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  createAdminPrice,
  getAdminAllPrice,
  getAdminPriceDetails,
};
