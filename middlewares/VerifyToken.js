const jwt =  require('jsonwebtoken');
const secretKey = require('../config/key');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('No token provided');
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      const user = req.user;
      const tokens = JSON.parse(user.tokens);
      if (!tokens.includes(token)) {
        return res.status(401).send('Invalid token');
      }
      next();
    });
  };
  
module.exports = verifyToken