const express = require('express');
const auth = require('../../middlewares/auth');
const {
  getAllDayMenusByCaterer,
  createNewDayMenu,
} = require('../../controllers/day-menu/day-menu.controller');

const dayMenuRouter = express.Router();

dayMenuRouter.get('/', auth, getAllDayMenusByCaterer);
dayMenuRouter.post('/', auth, createNewDayMenu);

module.exports = dayMenuRouter;
