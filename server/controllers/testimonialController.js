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

module.exports = {
  getAllTestimonials,
};
