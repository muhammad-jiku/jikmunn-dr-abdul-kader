//  external import
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    BookingItems: [
      {
        image: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        fee: {
          type: Number,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        service: {
          type: mongoose.Schema.ObjectId,
          ref: 'Service',
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    totalFees: {
      type: Number,
      required: true,
      default: 0,
    },
    BookingStatus: {
      type: String,
      required: true,
      default: 'Processing',
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.model.Bookings || new mongoose.model('Booking', bookingSchema);

//
module.exports = Booking;
