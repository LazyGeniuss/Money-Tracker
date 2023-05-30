// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect( () => {
    GetTransactions().then(transactions => {
      setTransactions(transactions);
    })
  }, [])

  const GetTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url)
    return await response.json();
  }
  
  const addNewTransaction = (e) => {
    // e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    fetch(url , {
      method:"POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime})
    }).then(response => {
      response.json().then(json => {
        setName(" ");
        setDatetime(" ");
        setDescription(" ");
          console.log("result", json);
      })
    })
  }

  let balance = 0;
  for (const transaction of transactions){
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2)

  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
  

  return (
    <div>
      <main>
        <h1>
          ${balance}<span>.{fraction}</span>
        </h1>
        <form onSubmit={addNewTransaction}>
          <div className="basics">
            <input type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder={"+200 new samsung tv"}></input>
            <input type="datetime-local" 
                    value={datetime} 
                    onChange={e => setDatetime(e.target.value)}></input>
          </div>
          <div className="description">
            <input type="text" 
                    placeholder={"description"} 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}></input>
          </div>
          <button type="submit" href="/">Add New Transaction</button>
        </form>

        <div className="transactions">
          {transactions.length>0 && transactions.map(transactions => (
              <div className="transaction">
              <div className="left">
                <div className="name">{transactions.name}</div>
                <div className="description">{transactions.description}</div>
              </div>
              <div className="right">
                <div className={"price " + (transactions.price<0 ? 'red':'green')}>
                  {transactions.price}
                </div>
                <div className="datetime">{transactions.datetime}</div>
              </div>
            </div>
           ))}
        </div>
      </main>  
    </div>
  );
}

export default App;
