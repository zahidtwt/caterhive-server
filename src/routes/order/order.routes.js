const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getOrdersForCaterers,
  getOrdersForCustomers,
  createNewOrder,
  getOrderById,
  updateOrderById,
} = require('../../controllers/order/order.controller');

const orderRouter = express.Router();

orderRouter.get('/caterers', auth, getOrdersForCaterers);
orderRouter.get('/customers', auth, getOrdersForCustomers);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', auth, createNewOrder);
orderRouter.put('/:id', auth, updateOrderById);

module.exports = orderRouter;
