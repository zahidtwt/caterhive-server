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

    const allOrdersOfCaterer = await orders.find({
      caterer: { _id: authUser },
      [searchBy]: { $regex: search, $options: 'i' },
    });

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

    const allOrdersOfCaterer = await orders.find({
      customer: { _id: authUser },
      [searchBy]: { $regex: search, $options: 'i' },
    });

    res.status(200).json(allOrdersOfCaterer);
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
      orderStatus: 'pending',
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getOrdersForCaterers,
  getOrdersForCustomers,
  createNewOrder,
};
