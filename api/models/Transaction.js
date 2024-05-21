const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  email: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

const TransactionModel = new model("Transaction", TransactionSchema);
const UserModel = new model("User", UserSchema);

module.exports = { TransactionModel, UserModel };
