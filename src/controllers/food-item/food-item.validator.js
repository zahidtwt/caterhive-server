const joi = require('joi');

const foodItemValidatorSchema = joi.object({
  caterer: joi.string().min(24).max(24).required().label('Caterer'),
  title: joi.string().min(3).max(255).required().label('Title'),
  imgUrl: joi.string().min(3).max(255).required().label('Image'),
  description: joi.string().min(3).max(255).required().label('Description'),
});

module.exports = foodItemValidatorSchema;
