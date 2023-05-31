const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction.js');
const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/api/test", (req,res) => {
    res.json({body : "test oks"})
})

app.post("/api/transaction", async (req,res) => {
    const {name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({name, description, datetime, price});
    return res.json(transaction);
})

app.get("/api/transactions", async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);

}) 

if(process.env.API_PORT){
    app.listen(process.env.API_PORT);
}

module.exports = app;
