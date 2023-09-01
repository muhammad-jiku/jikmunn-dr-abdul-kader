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
    // console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = {
  createBooking,
};
