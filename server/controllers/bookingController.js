const AsyncError = require('../middlewares/errors/AsyncError');
const Booking = require('../models/Booking');

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
    // console.log(error);s
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const getBookingData = AsyncError(async (req, res, next) => {
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
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  createBooking,
  getBookingData,
};
