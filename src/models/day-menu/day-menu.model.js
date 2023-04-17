const { Schema, model } = require('mongoose');

const dayMenuSchema = new Schema({
  caterer: {
    type: Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  menus: {
    type: [Schema.Types.ObjectId],
    ref: 'Menu',
    default: [],
    required: true,
  },
});

const dayMenus = model('Day-Menu', dayMenuSchema);

module.exports = dayMenus;
