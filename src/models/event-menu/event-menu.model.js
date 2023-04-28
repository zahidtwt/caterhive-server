const { Schema, model } = require('mongoose');

const eventMenuSchema = new Schema({
  caterer: {
    type: Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true,
  },
  title: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  appetizers: {
    type: [Schema.Types.ObjectId],
    ref: 'Food-Item',
    required: true,
  },
  mainCourses: {
    type: [Schema.Types.ObjectId],
    ref: 'Food-Item',
    required: true,
  },
  desserts: {
    type: [Schema.Types.ObjectId],
    ref: 'Food-Item',
    required: true,
  },
  drinks: {
    type: [Schema.Types.ObjectId],
    ref: 'Food-Item',
    required: true,
  },
  minEventOrder: {
    type: Number,
    required: true,
    default: 50,
  },
  discountOnEachHundred: {
    type: Number,
    required: true,
    default: 0,
  },
  maxDiscount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const eventMenus = model('Event-Menu', eventMenuSchema);

module.exports = eventMenus;
