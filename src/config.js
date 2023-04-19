require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const JWT_KEY = process.env.JWT_KEY;
const ENV = process.env.NODE_ENV;
const SSL_STORE_ID = process.env.SSL_STORE_ID;
const SSL_STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const CLIENT_URL = process.env.CLIENT_URL;

module.exports = {
  PORT,
  MONGO_URI,
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
  JWT_KEY,
  ENV,
  SSL_STORE_ID,
  SSL_STORE_PASSWORD,
  CLIENT_URL,
};
