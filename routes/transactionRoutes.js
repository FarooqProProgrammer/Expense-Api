const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middlewares/VerifyToken");
const { TransactionGet, TransactionPost, TransactionDelete } = require("../controllers/ExpenseController");
const Router = express.Router();



Router.get("/",verifyToken,(req,res)=>{
    res.send("Welcome")
})

// Expense Routes 
Router.get('/transactions',verifyToken, TransactionGet);
Router.post('/transactions',verifyToken,TransactionPost );
Router.delete('/transactions/:id', verifyToken,TransactionDelete);


module.exports = Router