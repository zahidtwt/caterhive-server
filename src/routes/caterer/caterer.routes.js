const express = require('express');
const {
  getAllCaterers,
  createNewCaterer,
  getCatererById,
  loginCaterer,
  getOwnData,
  addCatererToBookmark,
  reviewCatererById,
} = require('../../controllers/caterer/caterer.controller');
const auth = require('../../middlewares/auth');

const catererRouter = express.Router();

catererRouter.get('/', getAllCaterers);
catererRouter.get('/own', auth, getOwnData);
catererRouter.get('/:id', getCatererById);
catererRouter.post('/', createNewCaterer);
catererRouter.post('/login', loginCaterer);
catererRouter.post('/reviews/:id', auth, reviewCatererById);
catererRouter.put('/bookmark/:id', auth, addCatererToBookmark);

module.exports = catererRouter;
