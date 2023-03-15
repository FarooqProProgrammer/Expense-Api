const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transaction = require("./routes/transactionRoutes");
const UserAuth = require('./routes/UserRegister');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(transaction)
app.use(UserAuth)



  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
  });




  const PORT = 3001;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  