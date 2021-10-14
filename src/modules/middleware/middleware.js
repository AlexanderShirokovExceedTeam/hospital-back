const jwt = require('jsonwebtoken');
const key = require('../keys/keys');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'Unauthorized user'});  
    }
    const decodedData = jwt.verify(token, key);
    req.user = decodedData;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Unauthorized user'});
  }
}