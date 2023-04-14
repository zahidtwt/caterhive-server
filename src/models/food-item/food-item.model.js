const { Schema, model } = require('mongoose');

const foodItemSchema = new Schema({
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
  imgUrl: {
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
});

const foodItems = model('Food-Item', foodItemSchema);

module.exports = foodItems;
