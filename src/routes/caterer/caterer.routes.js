const express = require('express');
const {
  getAllCaterers,
  createNewCaterer,
  getCatererById,
  loginCaterer,
  getOwnData,
} = require('../../controllers/caterer/caterer.controller');
const auth = require('../../middlewares/auth');

const catererRouter = express.Router();

catererRouter.get('/', getAllCaterers);
catererRouter.get('/own', auth, getOwnData);
catererRouter.get('/:id', getCatererById);
catererRouter.post('/', createNewCaterer);
catererRouter.post('/login', loginCaterer);

module.exports = catererRouter;
