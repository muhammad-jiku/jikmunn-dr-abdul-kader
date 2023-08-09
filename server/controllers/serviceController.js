const AsyncError = require('../middlewares/errors/AsyncError');
const Service = require('../models/Service');
const cloudinary = require('cloudinary');

const createService = AsyncError(async (req, res) => {
  try {
    const { id, title, desc, slots, serviceImg } = await req.body;

    const serviceData = {
      id,
      title,
      desc,
      slots,
    };

    const myCloud = await cloudinary.v2.uploader.upload(serviceImg, {
      folder: 'jikmunn-doctor-abdul-kader/services',
      width: 150,
      crop: 'scale',
    });

    serviceData.serviceImg = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    serviceData.user = req?.user?.id;

    const service = await Service.create(serviceData);

    return res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

module.exports = { createService };