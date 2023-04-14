const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  content: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
});

const reviews = model('Review', reviewSchema);

module.exports = reviews;
