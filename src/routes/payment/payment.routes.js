const express = require('express');
const {
  makePayment,
  handleSuccesfulPayment,
  handleFailedPayment,
} = require('../../controllers/payment/payment.controller');

const paymentRouter = express.Router();

paymentRouter.get('/', makePayment);
paymentRouter.post('/success', handleSuccesfulPayment);
paymentRouter.post('/fail', handleFailedPayment);

module.exports = paymentRouter;
