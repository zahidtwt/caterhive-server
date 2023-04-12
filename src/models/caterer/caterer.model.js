const { Schema, model } = require('mongoose');

const catererSchema = new Schema({
  businessName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  phone: {
    type: String,
    min: 9,
    max: 15,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    max: 4096,
    required: true,
  },
  brandImg: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  activeDays: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
    required: true,
    default: [],
  },
  operationalAreas: {
    type: [Schema.Types.ObjectId],
    ref: 'Area',
    required: true,
    default: [],
  },
});

const caterers = model('Caterer', catererSchema);

module.exports = caterers;
