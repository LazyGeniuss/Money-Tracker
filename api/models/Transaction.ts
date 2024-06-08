import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface ITransaction {
  email: string;
  description: string;
  datetime: Date;
  price: number;
}

interface IUser {
  email: string;
  password: string;
  token: string;
}

const TransactionSchema = new Schema<ITransaction>({
  email: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

export const TransactionModel = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
export const UserModel = model<IUser>("User", UserSchema);

// module.exports = { TransactionModel, UserModel };
