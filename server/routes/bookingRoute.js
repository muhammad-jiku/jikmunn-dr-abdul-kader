//  external import
const express = require('express');
const {
  isAuthenticated,
  authorizeAdmin,
} = require('../middlewares/auth/AuthHandler');
const {
  createBooking,
  getBookingData,
  getAppointments,
  getAdminAllAppointments,
  updateAdminAppointmentData,
  deleteAdminAppointment,
} = require('../controllers/bookingController');

const bookingRoute = express.Router({
  caseSensitive: true,
});

bookingRoute.route('/booking/new').post(isAuthenticated, createBooking);
bookingRoute.route('/booking/:id').get(isAuthenticated, getBookingData);
bookingRoute.route('/bookings/me').get(isAuthenticated, getAppointments);
bookingRoute
  .route('/admin/bookings')
  .get(isAuthenticated, authorizeAdmin, getAdminAllAppointments);
bookingRoute
  .route('/admin/booking/:id')
  .put(isAuthenticated, authorizeAdmin, updateAdminAppointmentData)
  .delete(isAuthenticated, authorizeAdmin, deleteAdminAppointment);

//
module.exports = bookingRoute;
