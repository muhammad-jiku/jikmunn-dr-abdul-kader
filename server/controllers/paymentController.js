// external import
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// internal import
const AsyncError = require('../middlewares/errors/AsyncError');

const processPayment = AsyncError(async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        company: 'Dr. Abdul Kader',
      },
    });

    return res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      message: 'Invalid payment',
    });
  }
});

const sendStripeApiKey = AsyncError(async (req, res) => {
  try {
    return res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({
      message: 'Invalid API key',
    });
  }
});

// exporting modules
module.exports = {
  processPayment,
  sendStripeApiKey,
};
