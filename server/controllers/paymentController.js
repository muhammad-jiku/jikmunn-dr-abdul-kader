const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AsyncError = require('../middlewares/errors/AsyncError');

const processPayment = AsyncError(async (req, res) => {
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
});

module.exports = {
  processPayment,
};
