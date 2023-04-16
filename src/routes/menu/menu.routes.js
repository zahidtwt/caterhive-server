const express = require('express');

const auth = require('../../middlewares/auth');
const {
  getMenusByCaterer,
  createNewMenu,
  getMenuById,
  reviewMenuById,
  addMenuToBookmark,
} = require('../../controllers/menu/menu.controller');

const menusRouter = express.Router();

menusRouter.get('/', auth, getMenusByCaterer);
menusRouter.get('/:id', getMenuById);
menusRouter.post('/', auth, createNewMenu);
menusRouter.post('/reviews/:id', auth, reviewMenuById);
menusRouter.put('/bookmark/:id', auth, addMenuToBookmark);

module.exports = menusRouter;
