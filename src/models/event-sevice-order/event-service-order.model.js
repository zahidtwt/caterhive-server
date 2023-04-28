const { Schema, model } = require('mongoose');

const eventServiceOrderShcema = new Schema({
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
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Event-Menu',
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  orderValue: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
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
    min: 3,
    max: 255,
  },
  orderedAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});

const eventServiceOrders = model(
  'Event-Service-Order',
  eventServiceOrderShcema
);

module.exports = eventServiceOrders;
