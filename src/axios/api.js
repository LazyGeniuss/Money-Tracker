import instance from "./instance";

export const login = async (data) => {
  const res = await instance.post("login", data);
  return res;
};

export const signUp = async (data) => {
  const res = await instance.post("signup", data);
  return res;
};

export const getTransaction = async () => {
  try {
    const res = await instance.get("transactions");
    return res;
  } catch (e) {
    console.log("e", e);
  }
};

export const addTransaction = async (data) => {
  try {
    const res = await instance.post("transaction", data);
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
