const joi = require('joi');

const dayMenuValidatorSchema = joi.object({
  price: joi.number().required().label('Price'),
  menus: joi
    .array()
    .items(joi.string().min(24).max(24))
    .default([])
    .required()
    .label('Menus'),
});

module.exports = dayMenuValidatorSchema;
