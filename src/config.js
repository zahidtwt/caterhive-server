require('dotenv').config();

const PORT = process.env.PORT;
const ALLOWED_CORS_DOMAIN = process.env.ALLOWED_CORS_DOMAIN;

module.exports = {
  PORT,
  ALLOWED_CORS_DOMAIN,
};
