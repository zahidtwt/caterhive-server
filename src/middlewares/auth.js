const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');
const errorMessages = require('../utils/errorMessages');

async function auth(req, res, next) {
  try {
    const token = req.headers['x-auth-token'];

    if (!token) return res.status(401).json(errorMessages.accessDenied);

    const { id } = jwt.verify(token, JWT_KEY);

    req.authUser = id;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(401).json(error);
  }
}

module.exports = auth;
