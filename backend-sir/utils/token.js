const JWT = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (payload) => {
  return JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

const generateRandomToken = () => {
  return crypto.randomInt(100000, 999999);
};

module.exports = { generateToken, verifyToken, generateRandomToken };
