const caterers = require('../../models/caterer/caterer.model');
const customers = require('../../models/customer/customer.model');
const orders = require('../../models/order/order.model');
const validator = require('../../utils/validator');
const errorMessages = require('../../utils/errorMessages');
const orderValidatorSchema = require('./order.validator');
const menus = require('../../models/menu/menu.model');

async function getOrdersForCaterers(req, res) {
  try {
    const { authUser, query } = req;

    const { searchBy = 'orderStatus', search = '' } = query;

    const caterer = await caterers.findById(authUser);

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    const allOrdersOfCaterer = await orders
      .find({
        caterer: { _id: authUser },
        [searchBy]: { $regex: search, $options: 'i' },
      })
      .populate([
        { path: 'customer' },
        { path: 'orderedProducts', populate: { path: 'menu', model: 'Menu' } },
      ])
      .sort({ orderedAt: 'desc' });

    res.status(200).json(allOrdersOfCaterer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getOrdersForCustomers(req, res) {
  try {
    const { authUser, query } = req;

    const { searchBy = 'orderStatus', search = '' } = query;

    const customer = await customers.findById(authUser);

    if (!customer) return res.status(404).json(errorMessages.notFound);

    const allOrdersOfCaterer = await orders
      .find({
        customer: { _id: authUser },
        [searchBy]: { $regex: search, $options: 'i' },
      })
      .populate([
        { path: 'caterer' },
        { path: 'orderedProducts', populate: { path: 'menu' } },
      ])
      .sort({ orderedAt: 'desc' });

    res.status(200).json(allOrdersOfCaterer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await orders
      .findById(id)
      .populate([
        { path: 'caterer' },
        { path: 'orderedProducts', populate: { path: 'menu', model: 'Menu' } },
      ]);

    if (!order) return res.status(404).json(errorMessages.notFound);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createNewOrder(req, res) {
  try {
    const { authUser, body } = req;

    const { error } = validator(orderValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const customer = await customers.findById(authUser);

    if (!customer)
      return res.status(404).json('Customer' + errorMessages.notFound);

    const caterer = await caterers.findById(body.caterer);

    if (!caterer)
      return res.status(404).json('Caterer' + errorMessages.notFound);

    const newOrder = await orders.create({
      ...body,
      customer: authUser,
      orderStatus: 'processing',
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateOrderById(req, res) {
  try {
    const {
      body: { orderStatus },
      params: { id },
    } = req;

    const order = await orders.findById(id);

    if (!order) return res.status(404).json(errorMessages.notFound);

    order.orderStatus = orderStatus;

    await order.save();

    await order.populate([
      { path: 'customer' },
      { path: 'orderedProducts', populate: { path: 'menu', model: 'Menu' } },
    ]);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getOrdersForCaterers,
  getOrdersForCustomers,
  getOrderById,
  createNewOrder,
  updateOrderById,
};
