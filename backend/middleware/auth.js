// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
