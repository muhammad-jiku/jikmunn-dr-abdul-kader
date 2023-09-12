// external import
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema(
  {
    priceID: {
      type: String,
      required: [true, 'Please enter price ID number'],
      minLength: [1, 'Price ID number must be more than zero'],
    },
    title: {
      type: String,
      required: [true, 'Please enter price title'],
      minLength: [5, 'Price title must be more than 5 characters'],
    },
    subTitle: {
      type: String,
      required: [true, 'Please enter price sub-title'],
      minLength: [5, 'Price sub-title must be more than 5 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter price tag'],
      minLength: [1, 'Price tag number must be more than zero'],
    },
    diagnostics: {
      type: Array,
      required: [true, 'Please enter prices diagnostic lists'],
    },
    priceImg: {
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

const Price = mongoose.model.Prices || new mongoose.model('Price', priceSchema);

// exporting module
module.exports = Price;
