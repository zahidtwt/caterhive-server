const foodItems = require('../../models/food-item/food-item.model');
const validator = require('../../utils/validator');
const foodItemValidatorSchema = require('./food-item.validator');

async function getAllFoodItems(req, res) {
  try {
    const { authUser } = req;

    const allFoodItems = await foodItems.find({ caterer: { _id: authUser } });

    return res.status(200).json(allFoodItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createNewFoodItem(req, res) {
  try {
    const { authUser, body } = req;

    const foodItemCreds = {
      caterer: authUser,
      ...body,
    };

    const { error } = validator(foodItemValidatorSchema, foodItemCreds);

    if (error) return res.status(400).json(error.message);

    const newFoodItem = await foodItems.create(foodItemCreds);

    return res.status(201).json(newFoodItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllFoodItems,
  createNewFoodItem,
};
