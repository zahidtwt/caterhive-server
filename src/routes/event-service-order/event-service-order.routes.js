const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getAllEventServiceOrdersByCaterer,
  getEventServiceOrdersForCustomers,
  getEventServiceOrderById,
  createNewEventServiceOrder,
  updateEventServiceOrderById,
} = require('../../controllers/event-service-order/event-service-order.controller');

const eventServiceOrderRouter = express.Router();

eventServiceOrderRouter.get(
  '/caterers',
  auth,
  getAllEventServiceOrdersByCaterer
);
eventServiceOrderRouter.get(
  '/customers',
  auth,
  getEventServiceOrdersForCustomers
);
eventServiceOrderRouter.get('/:id', getEventServiceOrderById);
eventServiceOrderRouter.post('/', auth, createNewEventServiceOrder);
eventServiceOrderRouter.put('/:id', auth, updateEventServiceOrderById);

module.exports = eventServiceOrderRouter;
