const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Please enter service ID number'],
      minLength: [1, 'Service ID number must be more than zero'],
    },
    title: {
      type: String,
      required: [true, 'Please enter service title'],
      minLength: [5, 'Service title must be more than 5 characters'],
    },
    desc: {
      type: String,
      required: [true, 'Please enter service description'],
      minLength: [10, 'Service description must be more than 10 characters'],
    },
    slots: {
      type: Array,
      required: [true, 'Please enter service time slots'],
    },
    serviceImg: {
      public_id: String,
      url: String,
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

const Service =
  mongoose.model.Services || new mongoose.model('Service', serviceSchema);

module.exports = Service;
