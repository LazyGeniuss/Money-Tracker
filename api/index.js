const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { TransactionModel, UserModel } = require("./models/Transaction.js");
const { getToken } = require("./services/service.js");
const { auth } = require("./middlewares/auth.js");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => console.log("Error connecting to mongodb"));

app.get("/api/test", (req, res) => {
  res.json({ body: "test oks" });
});

app.post("/api/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exists = await UserModel.findOne({ email });
    console.log("exists", exists);

    if(exists?.email){
      return res.status(400).send({ message: "User already exists" });
    }

    const user = await UserModel.create({
      email,
      password,
      token: "",
    });

    return res.send(user);
  } catch (e) {
    console.log("err", e);
  }
});

app.post("/api/login", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const { email, password } = req.body;
    const response = await UserModel.findOne({ email, password });
    let token = "";
    if (response) {
      token = getToken({ email: response.email, password: response.password });
      await UserModel.updateOne(
        { email: response.email },
        { $set: { token: token } }
      );
      return res.send({ ...response._doc, token });
    }
    return res.status(400).send({ message: "Invalid login crendentials" });
  } catch (e) {
    console.log("e", e);
  }
});

app.post("/api/transaction", auth(), async (req, res) => {
  const { name, description, datetime, price } = req.body;

  const { email } = req.user;

  const transaction = await TransactionModel.create({
    email,
    name,
    description,
    datetime,
    price,
  });
  return res.json(transaction);
});

app.get("/api/transactions", auth(), async (req, res) => {
  try {
    const { email } = req.user;
    const transactions = await TransactionModel.find({ email });
    res.json(transactions);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

app.use((err, req, res, next) => {
  console.log("err", err);
  return res.status(400).send("Something went wrong");
});

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT, () =>
    console.log(`listening on ${process.env.API_PORT}`)
  );
}

module.exports = app;
