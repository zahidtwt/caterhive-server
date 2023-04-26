const express = require('express');

const auth = require('../../middlewares/auth');
const {
  getAllFoodItems,
  createNewFoodItem,
  getAllFoodItemsByCatererAndCategory,
} = require('../../controllers/food-item/food-item.controller');

const foodItemsRouter = express.Router();

foodItemsRouter.get('/', auth, getAllFoodItems);
foodItemsRouter.get('/category', auth, getAllFoodItemsByCatererAndCategory);
foodItemsRouter.post('/', auth, createNewFoodItem);

module.exports = foodItemsRouter;
