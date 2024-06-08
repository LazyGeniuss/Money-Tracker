import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import mongoose from "mongoose";

import { TransactionModel, UserModel } from "./models/Transaction";
import { getToken } from "./services/service";
import { auth } from "./middlewares/auth";

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => console.log("Error connecting to mongodb"));

declare global {
  namespace Express {
    interface Request {
      user?: {
        password: string;
        email: string;
      };
    }
  }
}

app.get("/api/test", (_: Request, res: Response) => {
  res.status(200).send({ body: "test oks" });
});

app.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const exists = await UserModel.findOne({ email });
    console.log("exists", exists);

    if (exists?.email) {
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

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    console.log("req", req.body);
    const { email, password } = req.body;
    const response = await UserModel.findOne({ email, password })!;
    let token = "";
    if (response) {
      token = getToken({ email: response.email, password: response.password });
      await UserModel.updateOne(
        { email: response.email },
        { $set: { token: token } }
      );
      return res.send({
        email: response.email,
        password: response.password,
        token,
      });
    }
    return res.status(400).send({ message: "Invalid login crendentials" });
  } catch (e) {
    console.log("e", e);
  }
});

app.post("/api/transaction", auth(), async (req: Request, res: Response) => {
  const { name, description, datetime, price } = req.body;

  console.log("resss", name, description, datetime, price);
  const { email } = req.user!;

  

  const transaction = await TransactionModel.create({
    email,
    name,
    description,
    datetime,
    price: +price,
  });
  return res.json(transaction);
});

app.get("/api/transactions", auth(), async (req: Request, res: Response) => {
  try {
    const { email } = req.user!;
    const transactions = await TransactionModel.find({ email });
    res.json(transactions);
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("err", err);
    return res.status(400).send("Something went wrong");
  }
);

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT, () =>
    console.log(`listening on ${process.env.API_PORT}`)
  );
}

export default app;
