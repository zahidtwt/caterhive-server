const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
  fullName: {
    type: String,
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
  address: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  profileImg: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area',
    required: true,
  },
  bookmarks: {
    type: {
      _id: false,
      caterers: {
        type: [Schema.Types.ObjectId],
        ref: 'Caterer',
        default: [],
      },
      menus: {
        type: [Schema.Types.ObjectId],
        ref: 'Menu',
        default: [],
      },
    },
    ref: 'Order',
    required: true,
    default: {
      caterers: [],
      menus: [],
    },
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: 'Order',
    required: true,
    default: [],
  },
});

const customers = model('Customer', customerSchema);

module.exports = customers;
