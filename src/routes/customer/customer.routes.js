const express = require('express');
const {
  getCustomerById,
  createNewCustomer,
  getOwnData,
  loginCustomer,
} = require('../../controllers/customer/customer.controller');
const auth = require('../../middlewares/auth');

const customerRouter = express.Router();

customerRouter.get('/own', auth, getOwnData);
customerRouter.get('/:id', getCustomerById);
customerRouter.post('/', createNewCustomer);
customerRouter.post('/login', loginCustomer);

module.exports = customerRouter;
