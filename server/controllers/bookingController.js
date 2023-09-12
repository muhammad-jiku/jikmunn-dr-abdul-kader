// internal imports
const Booking = require('../models/Booking');
const AsyncError = require('../middlewares/errors/AsyncError');

const createBooking = AsyncError(async (req, res) => {
  try {
    const { bookingItems, paymentInfo, totalFees } = await req.body;

    const booking = await Booking.create({
      bookingItems,
      paymentInfo,
      totalFees,
      paidAt: Date.now(),
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAppointments = AsyncError(async (req, res) => {
  try {
    const { id } = await req.user;
    const appointments = await Booking.find({ user: id });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminAllAppointments = AsyncError(async (req, res) => {
  try {
    const allAppointments = await Booking.find({});
    let totalFees = 0;

    allAppointments.forEach((appointment) => {
      totalFees += appointment.totalFees;
    });

    return res.status(200).json({
      success: true,
      totalFees,
      data: allAppointments,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const getAdminBookingData = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const bookingData = await Booking.findById({ _id: id }).populate(
      'user',
      'username email'
    );

    if (!bookingData) {
      return next(new ErrorHandler('No booking data found with this id', 404));
    }

    return res.status(200).json({
      success: true,
      data: bookingData,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const updateAdminAppointmentData = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const { bookingStatus } = await req.body;
    let appointment = await Booking.findById({ _id: id });

    if (!appointment) {
      return next(new ErrorHandler('No booking data found with this id', 404));
    }

    if (appointment.bookingStatus === 'Succeeded') {
      return next(
        new ErrorHandler('Meeting is already fixed with this id', 400)
      );
    }

    if (bookingStatus === 'Succeeded') {
      appointment.bookingStatus = bookingStatus;
    } else {
      appointment.bookingStatus = bookingStatus;
    }

    const updatedAppointment = await appointment.save({
      validateBeforeSave: false,
    });

    appointment = await Booking.findById({ _id: id });

    return res.status(200).json({
      success: true,
      data: appointment,
      updatedAppointment,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const deleteAdminAppointment = AsyncError(async (req, res, next) => {
  try {
    const { id } = await req.params;
    const appointment = await Booking.findById({ _id: id });

    if (!appointment) {
      return next(new ErrorHandler('No booking found with this id', 404));
    } else {
      await Booking.deleteOne({ _id: id });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// exporting modules
module.exports = {
  createBooking,
  getAppointments,
  getAdminAllAppointments,
  getAdminBookingData,
  updateAdminAppointmentData,
  deleteAdminAppointment,
};
