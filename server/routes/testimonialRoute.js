const express = require('express');
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');
const {
  createTestimonial,
  getAllTestimonials,
  deleteAdminTestimonial,
} = require('../controllers/testimonialController');

const testimonialRoute = express.Router({
  caseSensitive: true,
});

testimonialRoute.route('/testimonial').put(isAuthenticated, createTestimonial);
testimonialRoute.route('/testimonials').get(getAllTestimonials);
testimonialRoute
  .route('/admin/testimonial/:id')
  .delete(isAuthenticated, authorizeAdmin, deleteAdminTestimonial);

module.exports = testimonialRoute;
