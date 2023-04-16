const { Schema, model } = require('mongoose');

const menuSchema = new Schema({
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
  description: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  thumbnail: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  foodItems: {
    type: [Schema.Types.ObjectId],
    ref: 'Food-Item',
    required: true,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
    required: true,
  },
});

const menus = model('Menu', menuSchema);

module.exports = menus;
