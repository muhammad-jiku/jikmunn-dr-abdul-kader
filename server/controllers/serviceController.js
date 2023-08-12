const AsyncError = require('../middlewares/errors/AsyncError');
const Service = require('../models/Service');
const cloudinary = require('cloudinary');

const createService = AsyncError(async (req, res) => {
  try {
    const { id } = await req.user;
    const { serviceID, title, desc, slots, serviceImg } = await req.body;

    const serviceData = {
      serviceID,
      title,
      desc,
      slots,
    };

    const myCloud = await cloudinary.v2.uploader.upload(serviceImg, {
      folder: 'jikmunn-doctor-abdul-kader/services',
      // width: 150,
      // crop: 'scale',
    });

    serviceData.serviceImg = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    serviceData.user = id;

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

const getAdminAllService = AsyncError(async (req, res) => {
  try {
    const services = await Service.find({});

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminServiceDetails = AsyncError(async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById({ _id: id });

    if (!service) {
      return new ErrorHandler('Service not found', 404);
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  createService,
  getAdminAllService,
  getAdminServiceDetails,
};
