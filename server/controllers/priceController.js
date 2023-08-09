const AsyncError = require('../middlewares/errors/AsyncError');
const cloudinary = require('cloudinary');
const Price = require('../models/Price');

const createPrice = AsyncError(async (req, res) => {
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

module.exports = {
  createPrice,
};
