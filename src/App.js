// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setTokenValue = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  return (
    <>
      <nav>
        <h1>Money Tracker</h1>{" "}
      </nav>
      {token ? (
        <Home logout={logout} />
      ) : (
        <Login setTokenValue={setTokenValue} />
      )}
    </>
  );
}

export default App;
