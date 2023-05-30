const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const TransctionSchema = new Schema({
    name : {type : String, required: true },
    price : {type : Number, required: true },
    description : {type : String, required: true },
    datetime : {type : Date, required: true },
})

const TransactionModel = new model("Transaction", TransctionSchema);

module.exports = TransactionModel;