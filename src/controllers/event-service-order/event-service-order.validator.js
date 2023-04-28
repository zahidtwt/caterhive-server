const joi = require('joi');

const eventServiceOrderValidatorSchema = joi.object({
  caterer: joi.string().min(24).max(24).required().label('Caterer'),
  menu: joi.string().min(24).max(24).required().label('Menu'),
  quantity: joi.number().min(1).required().label('Quantity'),
  orderValue: joi.number().required().label('Order Value'),
  discount: joi.number().optional().allow(0).label('Discount'),
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

module.exports = eventServiceOrderValidatorSchema;
