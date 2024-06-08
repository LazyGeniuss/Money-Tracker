import { getUserFromToken } from "../services/service";
import { Request, Response, NextFunction } from "express";

// interface request extends Request {
//   user?: { email: string; password: string };
// }

declare module "express" {
  interface Request{
    user?: { email: string; password: string };
  }
}

export const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    const data = getUserFromToken(token!);
    req.user = data;

    next();
  };
};
