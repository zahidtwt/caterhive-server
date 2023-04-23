const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
    unique: true,
  },
});

const categories = model('Category', categorySchema);

module.exports = categories;
