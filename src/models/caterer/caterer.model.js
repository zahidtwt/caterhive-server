const { Schema, model } = require('mongoose');

const catererSchema = new Schema({
  businessName: {
    type: String,
    unique: true,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    min: 3,
    max: 255,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
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
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    default: 0,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Review',
    required: true,
  },
  operationalAreas: {
    type: [Schema.Types.ObjectId],
    ref: 'Area',
    required: true,
  },
  weekMenu: {
    saturday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    sunday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    monday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    tuesday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    wednesday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    thursday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
    friday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
    },
  },
});

const caterers = model('Caterer', catererSchema);

module.exports = caterers;
