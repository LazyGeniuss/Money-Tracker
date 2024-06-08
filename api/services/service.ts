const jwt = require("jsonwebtoken");

const secret = "LazyGenius";

interface IPayload {
  email: string;
  password: string;
}

export const getToken = (payload: IPayload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

export const getUserFromToken = (token: string) => {
  const decode = jwt.verify(token, secret);
  return decode;
};

