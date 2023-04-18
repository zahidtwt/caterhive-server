const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getOrdersForCaterers,
  getOrdersForCustomers,
  createNewOrder,
} = require('../../controllers/order/order.controller');

const orderRouter = express.Router();

orderRouter.get('/caterers', auth, getOrdersForCaterers);
orderRouter.get('/customers', auth, getOrdersForCustomers);
orderRouter.post('/', auth, createNewOrder);

module.exports = orderRouter;
