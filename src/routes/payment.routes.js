const express = require('express');
const {
  makePayment,
  handlePayment,
} = require('../controllers/payment/payment.controller');

const paymentRouter = express.Router();

paymentRouter.get('/', makePayment);
paymentRouter.post('/success', handlePayment);

module.exports = paymentRouter;
