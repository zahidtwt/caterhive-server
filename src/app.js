const express = require('express');
const cors = require('cors');
const { ALLOWED_CORS_DOMAIN } = require('./config');
const globalRouter = require('./routes/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', globalRouter);

module.exports = app;
