const express = require('express');
const cors = require('cors');
const { ALLOWED_CORS_DOMAIN } = require('./config');

const app = express();

// Middlewares
app.use(
  cors({
    origin: ALLOWED_CORS_DOMAIN,
  })
);
app.use(express.json());

module.exports = app;
