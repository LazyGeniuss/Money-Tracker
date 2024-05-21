const { getUserFromToken } = require("../services/service");

const auth = () => {
  return (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const data = getUserFromToken(token);
    req.user = data;

    next();
  };
};

module.exports = { auth };
