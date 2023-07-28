const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [3, 'Your username must be longer than 3 characters'],
      required: [true, 'Please enter your username'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      // required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than 6 characters'],
      select: false,
    },
    googleId: {
      type: String,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: 'User',
    },
    phone: {
      type: String,
      // maxLength: [30, 'Phone cannot exceed 30 characters'],
      minLength: [11, 'Invalid phone number'],
      maxLength: [14, 'Invalid phone number'],
    },
    country: {
      type: String,
      maxLength: [100, 'Country name is exceeding its limit'],
      minLength: [2, 'Invalid country name'],
    },
    state: {
      type: String,
      maxLength: [100, 'State name is exceeding its limit'],
      minLength: [1, 'Invalid state name'],
    },
    city: {
      type: String,
      maxLength: [100, 'City name is exceeding its limit'],
      minLength: [2, 'Invalid city name'],
    },
    address: {
      type: String,
      maxLength: [100, 'Address cannot exceed 100 characters'],
      minLength: [10, 'Address should have more than 10 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

const User = mongoose.model.Users || new mongoose.model('User', userSchema);

module.exports = User;
