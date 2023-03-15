const db = require("../config/db");


const TransactionGet = (req, res) => {
    const sql = 'SELECT * FROM transactions ORDER BY date DESC';
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
}


const TransactionPost = (req, res) => {
    const { name, amount, date } = req.body;
    const sql = 'INSERT INTO transactions (name, amount, date) VALUES (?, ?, ?)';
    db.query(sql, [name, amount, date], (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Transaction added');
    });
}


const TransactionDelete = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM transactions WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send('Transaction deleted');
    });
  }
module.exports = {TransactionGet,TransactionPost,TransactionDelete}