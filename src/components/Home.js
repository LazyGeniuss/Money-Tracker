import { useEffect, useState } from "react";
import "../App.css";
import { addTransaction, getTransaction } from "../axios/api";

function Home({ logout }) {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState();
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const res = await getTransaction();
      setTransactions(res.data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const addNewTransaction = async (e) => {
    try {
      e.preventDefault();
      if (!name || !datetime || !description) {
        alert("Please fill all the details");
        return;
      }

      const price = name.split(" ")[0];
      const res = await addTransaction({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      });
      setTransactions((prev) => [
        ...prev,
        {
          price: +price,
          description,
          datetime,
          name: name.substring(price.length + 1),
        },
      ]);
      setName("");
      setDatetime("");
      setDescription("");
    } catch (e) {
      console.log("Error", e);
    }
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);

  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <div>
      <main>
        <h1>
          ${balance}
          <span>.{fraction}</span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div className="basics">
            <input
              type="number"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"+200"}></input>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}></input>
          </div>
          <div className="description">
            <input
              type="text"
              placeholder={"description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}></input>
          </div>
          <button type="submit" href="/">
            Add New Transaction
          </button>
          <button onClick={logout}>LogOut</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transactions, index) => (
              <div className="transaction" key={index}>
                <div className="left">
                  {/* <div className="name">{transactions.name}</div> */}
                  <div className="name">{transactions.description}</div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transactions.price < 0 ? "red" : "green")
                    }>
                    {transactions.price}
                  </div>
                  <div className="datetime">
                    {transactions.datetime.split("T")[0] +
                      " " +
                      transactions.datetime.split("T")[1].slice(0, 8)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
