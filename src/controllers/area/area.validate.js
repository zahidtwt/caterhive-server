const joi = require('joi');

const areaValidatorSchema = joi.object({
  city: joi.string().min(3).max(255).required().label('City'),
  name: joi.string().min(3).max(255).required().label('Name'),
});

module.exports = areaValidatorSchema;
