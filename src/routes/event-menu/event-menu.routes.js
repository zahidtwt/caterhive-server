const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getAllEventMenusByCaterer,
  getEventMenusById,
  createNewEventMenu,
} = require('../../controllers/event-menu/event-menu.contrroller');

const eventMenuRouter = express.Router();

eventMenuRouter.get('/', auth, getAllEventMenusByCaterer);
eventMenuRouter.get('/:id', auth, getEventMenusById);
eventMenuRouter.post('/', auth, createNewEventMenu);

module.exports = eventMenuRouter;
