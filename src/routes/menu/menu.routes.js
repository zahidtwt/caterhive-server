const express = require('express');

const auth = require('../../middlewares/auth');
const {
  getMenusByCaterer,
  createNewMenu,
  getMenuById,
  reviewMenuById,
} = require('../../controllers/menu/menu.controller');

const menusRouter = express.Router();

menusRouter.get('/', auth, getMenusByCaterer);
menusRouter.get('/:id', getMenuById);
menusRouter.post('/', auth, createNewMenu);
menusRouter.post('/reviews/:id', auth, reviewMenuById);

module.exports = menusRouter;
