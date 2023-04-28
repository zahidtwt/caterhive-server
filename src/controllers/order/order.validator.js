const joi = require('joi');

const orderValidatorSchema = joi.object({
  caterer: joi.string().min(24).max(24).required().label('Caterer'),
  orderedProducts: joi
    .array()
    .items({
      menu: joi.string().min(24).max(24),
      quantity: joi.number(),
    })
    .required()
    .default([])
    .label('Ordered Products'),
  orderValue: joi.number().required().label('Order Value'),
  shippingAddress: joi
    .string()
    .min(3)
    .max(255)
    .required()
    .label('Shipping Address'),
  specialInstruction: joi
    .string()
    .optional()
    .allow('')
    .max(255)
    .label('Special Instruction'),
});

module.exports = orderValidatorSchema;
