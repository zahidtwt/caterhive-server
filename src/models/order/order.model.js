const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  caterer: {
    type: Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  orderedProducts: {
    type: [
      {
        _id: false,
        menu: {
          type: Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    required: true,
    default: [],
  },
  orderValue: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  paymentDue: {
    type: Boolean,
    required: true,
    default: false,
  },
  shippingAddress: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  specialInstruction: {
    type: String,
    max: 255,
  },
  orderedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});

const orders = model('Order', orderSchema);

module.exports = orders;
