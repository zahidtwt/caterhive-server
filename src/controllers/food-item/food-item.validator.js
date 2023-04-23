const joi = require('joi');

const foodItemValidatorSchema = joi.object({
  title: joi.string().min(3).max(255).required().label('Title'),
  imgUrl: joi.string().required().label('Image'),
  description: joi.string().min(3).max(255).required().label('Description'),
  price: joi.number().required().label('Price'),
  category: joi.string().min(24).max(24).required().label('Category'),
});

module.exports = foodItemValidatorSchema;
