const AsyncError = require('../middlewares/errors/AsyncError');
const Testimonial = require('../models/Testimonial');

const getAllTestimonials = AsyncError(async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});

    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const deleteAdminTestimonial = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const testimonial = await Testimonial.findById({ _id: id });

    if (!testimonial) {
      return next(
        new ErrorHandler(`Testimonial does not exist with Id: ${id}`, 400)
      );
    } else {
      await Testimonial.deleteOne({ _id: id });
    }

    return res.status(200).json({
      success: true,
      message: 'Testimonial Deleted Successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  getAllTestimonials,
  deleteAdminTestimonial,
};
