const joi = require('joi');

const eventMenuValidatorSchema = joi.object({
  caterer: joi.string().min(24).max(24).required().label('Caterer'),
  title: joi.string().min(3).max(255).required().label('Title'),
  appetizers: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('Appetizers'),
  mainCourses: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('Main Courses'),
  desserts: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('Desserts'),
  drinks: joi
    .array()
    .items(joi.string().min(24).max(24))
    .required()
    .label('Drinks'),
});

module.exports = eventMenuValidatorSchema;
