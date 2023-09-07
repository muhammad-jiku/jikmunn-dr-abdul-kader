const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial =
  mongoose.model.Testimonials ||
  new mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
