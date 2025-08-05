const jwt = require("jsonwebtoken");

// Function to generate a JWT token
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  // Sign the token with a secret key and set an expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5d" });
};
