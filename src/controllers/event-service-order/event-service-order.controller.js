const caterers = require("../../models/caterer/caterer.model");
const customers = require("../../models/customer/customer.model");
const validator = require("../../utils/validator");
const errorMessages = require("../../utils/errorMessages");
const eventServiceOrders = require("../../models/event-sevice-order/event-service-order.model");
const eventServiceOrderValidatorSchema = require("./event-service-order.validator");

const eventOrderPopulation = [
  { path: "customer" },
  { path: "caterer" },
  {
    path: "menu",
    populate: "appetizers mainCourses desserts drinks",
  },
];

async function getAllEventServiceOrdersByCaterer(req, res) {
  try {
    const { authUser } = req;

    const caterer = await caterers.findById(authUser);

    if (!caterer) return res.status(404).json(errorMessages.notFound);

    const allOrdersOfCaterer = await eventServiceOrders
      .find({
        caterer: { _id: authUser },
      })
      .populate("customer menu")
      .sort({ orderedAt: "desc" });

    res.status(200).json(allOrdersOfCaterer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getEventServiceOrdersForCustomers(req, res) {
  try {
    const { authUser } = req;

    const customer = await customers.findById(authUser);

    if (!customer) return res.status(404).json(errorMessages.notFound);

    const allOrdersOfCaterer = await eventServiceOrders
      .find({
        customer: { _id: authUser },
      })
      .populate("caterer menu")
      .sort({ orderedAt: "desc" });

    res.status(200).json(allOrdersOfCaterer);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getEventServiceOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await eventServiceOrders
      .findById(id)
      .populate(eventOrderPopulation);

    if (!order) return res.status(404).json(errorMessages.notFound);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createNewEventServiceOrder(req, res) {
  try {
    const { authUser, body } = req;

    const { error } = validator(eventServiceOrderValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const customer = await customers.findById(authUser);

    if (!customer)
      return res.status(404).json("Customer" + errorMessages.notFound);

    const caterer = await caterers.findById(body.caterer);

    if (!caterer)
      return res.status(404).json("Caterer" + errorMessages.notFound);

    const newOrder = await eventServiceOrders.create({
      ...body,
      customer: authUser,
      orderStatus: "processing",
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateEventServiceOrderById(req, res) {
  try {
    const {
      body: { orderStatus },
      params: { id },
    } = req;

    const order = await eventServiceOrders.findById(id);

    if (!order) return res.status(404).json(errorMessages.notFound);

    order.orderStatus = orderStatus;

    await order.save();

    await order.populate({ path: "customer menu" });

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllEventServiceOrdersByCaterer,
  getEventServiceOrdersForCustomers,
  getEventServiceOrderById,
  createNewEventServiceOrder,
  updateEventServiceOrderById,
};
