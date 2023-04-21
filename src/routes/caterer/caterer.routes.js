const express = require('express');
const {
  getAllCaterers,
  createNewCaterer,
  getCatererById,
  loginCaterer,
  getOwnData,
  addCatererToBookmark,
  reviewCatererById,
  addDayMenu,
  getAllCaterersByArea,
} = require('../../controllers/caterer/caterer.controller');
const auth = require('../../middlewares/auth');

const catererRouter = express.Router();

catererRouter.get('/', getAllCaterers);
catererRouter.get('/area', getAllCaterersByArea);
catererRouter.get('/own', auth, getOwnData);
catererRouter.get('/:id', getCatererById);
catererRouter.post('/', createNewCaterer);
catererRouter.post('/login', loginCaterer);
catererRouter.post('/reviews/:id', auth, reviewCatererById);
catererRouter.put('/bookmark/:id', auth, addCatererToBookmark);
catererRouter.put('/dayMenu', auth, addDayMenu);

module.exports = catererRouter;
