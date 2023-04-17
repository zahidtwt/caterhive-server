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
    default: [],
  },
  operationalAreas: {
    type: [Schema.Types.ObjectId],
    ref: 'Area',
    required: true,
    default: [],
  },
  weekMenu: {
    saturday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    sunday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    monday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    tuesday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    wednesday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    thursday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
    friday: {
      type: Schema.Types.ObjectId,
      ref: 'Day-Menu',
      default: [],
    },
  },
});

const caterers = model('Caterer', catererSchema);

module.exports = caterers;
