import React, { useCallback, useEffect, useState, FormEvent } from "react";
import "../App.css";
import { login, signUp } from "../axios/api";

interface Iprops {
  setTokenValue: (token: string) => void;
}

interface Error {
  response?: { data?: { message?: string } };
}

const Login: React.FC<Iprops> = ({ setTokenValue }) => {
  const [type, setType] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [type]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        let res;
        if (type === "Login") {
          res = await login({ email, password });
          localStorage.setItem("token", res.data.token);
          const getI = localStorage.getItem("token") || "";
          setTokenValue(getI);
        } else {
          res = await signUp({ email, password });
          alert("Sign up successfull");
          setType("Login");
        }
      } catch (e) {
        const error = e as Error;
        console.log("e", error);
        alert(error?.response?.data?.message ?? "Something went wrong");
      }
    },
    [email, password]
  );

  return (
    <div>
      <main>
        <h1>{type}</h1>
        <form onSubmit={onSubmit}>
          <div className="basics">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Please Enter your Email"}
            />
          </div>
          <div className="basics">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Please Enter your Password"}
            />
          </div>
          <button type="submit">{type}</button>
        </form>
        {type === "Login" ? (
          <p>
            Don't have an account?{" "}
            <a onClick={() => setType("SignUp")}>SignUp</a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a onClick={() => setType("Login")}>Login</a>
          </p>
        )}
      </main>
    </div>
  );
};

export default Login;
