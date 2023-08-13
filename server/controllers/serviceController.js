const AsyncError = require('../middlewares/errors/AsyncError');
const ErrorHandler = require('../middlewares/errors/ErrorHandler');
const Service = require('../models/Service');
const cloudinary = require('cloudinary');

const createAdminService = AsyncError(async (req, res) => {
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

const updateAdminServiceDetails = AsyncError(async (req, res) => {
  try {
    const { id } = await req.params;
    const { serviceID, title, desc, slots, serviceImg } = await req.body;

    let service = await Service.findById({ _id: id });

    if (!service) {
      return new ErrorHandler('Service details is not found', 404);
    }

    const updatedServiceInfo = {
      serviceID,
      title,
      desc,
      slots,
      serviceImg,
    };

    const opts = {
      runValidators: true,
      new: true,
    };

    if (serviceImg !== '') {
      const serviceData = await Service.findById({ _id: id });

      const imageId = serviceData?.serviceImg?.public_id;

      imageId?.length > 0 && (await cloudinary.v2.uploader.destroy(imageId));

      const myCloud = await cloudinary.v2.uploader.upload(serviceImg, {
        folder: 'jikmunn-doctor-abdul-kader/services',
      });

      updatedServiceInfo.serviceImg = {
        public_id: myCloud?.public_id,
        url: myCloud?.secure_url,
      };
    }

    service = await Service.findByIdAndUpdate(
      { _id: id },
      {
        $set: updatedServiceInfo,
      },
      {
        opts,
      }
    ).exec();

    service = await Service.findById({ _id: id });

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

const deleteAdminServiceDetails = AsyncError(async (req, res) => {
  try {
    const { id } = await req.params;
    const service = await Service.findById({ _id: id });

    if (!service) {
      return new ErrorHandler(
        `Service detail does not exist with Id: ${id}`,
        400
      );
    } else {
      const imageId = service?.serviceImg?.public_id;
      imageId ? await cloudinary.v2.uploader.destroy(imageId) : null;

      await Service.deleteOne({ _id: id });
    }

    return res.status(200).json({
      success: true,
      message: 'Service Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  createAdminService,
  getAdminAllService,
  getAdminServiceDetails,
  updateAdminServiceDetails,
  deleteAdminServiceDetails,
};
