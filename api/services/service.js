const jwt = require("jsonwebtoken");

const secret = "LazyGenius";

const getToken = (payload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

const getUserFromToken = (token) => {
  const decode = jwt.verify(token, secret);
  return decode;
};

module.exports = { getToken, getUserFromToken };
