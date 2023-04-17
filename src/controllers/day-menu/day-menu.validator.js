const joi = require('joi');

const dayMenuValidatorSchema = joi.object({
  title: joi.string().min(3).max(255).required().label('Title'),
  price: joi.number().required().label('Price'),
  menus: joi
    .array()
    .items(joi.string().min(24).max(24))
    .default([])
    .required()
    .label('Menus'),
});

module.exports = dayMenuValidatorSchema;
