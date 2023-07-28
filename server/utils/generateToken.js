const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: `${process.env.EXPIRES_IN}s`,
    }
  );
};

module.exports = {
  generateToken,
};
