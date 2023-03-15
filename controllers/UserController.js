const db = require("../config/db");
const verifyToken = require("../middlewares/VerifyToken");
const jwt  = require("jsonwebtoken")

const RegisterContoller = (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('User created');
    });
}

const LoginController = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            const token = jwt.sign({ username }, secretKey);
            const user = result[0];
            const tokens = JSON.parse(user.tokens);
            tokens.push(token);
            const updateSql = 'UPDATE users SET tokens = ? WHERE id = ?';
            db.query(updateSql, [JSON.stringify(tokens), user.id], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send({ token });
            });
        } else {
            res.status(401).send('Unauthorized');
        }
    });
}


const SignoutController = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('No token provided');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      const username = decoded.username;
      const sql = 'SELECT * FROM users WHERE username = ?';
      db.query(sql, [username], (err, result) => {
        if (err) {
          throw err;
        }
        const user = result[0];
        const tokens = JSON.parse(user.tokens);
        const index = tokens.indexOf(token);
        if (index !== -1) {
          tokens.splice(index, 1);
          const updateSql = 'UPDATE users SET tokens = ? WHERE id = ?';
          db.query(updateSql, [JSON.stringify(tokens), user.id], (err, result) => {
            if (err) {
              throw err;
            }
            res.send('Signout successful');
          });
        } else {
          res.send('Signout successful');
        }
      });
    });
}
module.exports = { RegisterContoller, LoginController,SignoutController }