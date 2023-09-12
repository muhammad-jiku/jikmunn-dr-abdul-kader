//  external import
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingItems: [
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
        meetingTime: {
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
    bookingStatus: {
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

// exporting module
module.exports = Booking;
