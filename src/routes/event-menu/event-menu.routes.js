const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getAllEventMenusByCaterer,
  createNewEventMenu,
} = require('../../controllers/event-menu/event-menu.contrroller');

const eventMenuRouter = express.Router();

eventMenuRouter.get('/', auth, getAllEventMenusByCaterer);
eventMenuRouter.post('/', auth, createNewEventMenu);

module.exports = eventMenuRouter;
