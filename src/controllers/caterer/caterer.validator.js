const joi = require('joi');

const catererValidatorSchema = joi.object({
  businessName: joi.string().min(3).max(255).required().label('business Name'),
  email: joi
    .string()
    .email({ tlds: false })
    .min(3)
    .max(255)
    .required()
    .label('Email'),
  phone: joi.string().min(9).max(15).required().label('Phone'),
  password: joi.string().min(8).max(255).required().label('Password'),
  brandImg: joi.string().required().label('Brand Logo'),
  activeDays: joi.string().min(3).max(255).required().label('Active Days'),
  operationalAreas: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('Operational Areas'),
});

module.exports = catererValidatorSchema;
