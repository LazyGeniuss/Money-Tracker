import instance from "./instance";
import { ITransaction } from "../components/Home";

interface ILogin {
  email: string;
  password: string;
}

interface ILoginRes {
  email: string;
  password: string;
  token: string;
}

export const login = async (data: ILogin) => {
  const res = await instance.post<ILoginRes>("login", data);
  return res;
};

export const signUp = async (data: ILogin) => {
  const res = await instance.post<ILoginRes>("signup", data);
  return res;
};

export const getTransaction = async () => {
  try {
    const res = await instance.get<ITransaction[]>("transactions");
    return res;
  } catch (e) {
    console.log("e", e);
  }
};

export const addTransaction = async (data: ITransaction) => {
  try {
    const res = await instance.post<ITransaction>("transaction", data);
    return res;
  } catch (e) {
    console.log("e", e);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
  } catch (e) {
    console.log("e", e);
  }
};
