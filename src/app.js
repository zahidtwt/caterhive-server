const express = require('express');
const cors = require('cors');
const globalRouter = require('./routes/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/', globalRouter);

module.exports = app;
