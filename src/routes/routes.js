const express = require('express');
const areaRouter = require('./area/area.routes');
const catererRouter = require('./caterer/caterer.routes');
const customerRouter = require('./customer/customer.routes');
const foodItemsRouter = require('./food-item/food-item.routes');
const menusRouter = require('./menu/menu.routes');
const dayMenuRouter = require('./day-menu/day-menu.routes');
const orderRouter = require('./order/order.routes');
const paymentRouter = require('./payment/payment.routes');
const categoryRouter = require('./category/category.routes');
const eventMenuRouter = require('./event-menu/event-menu.routes');
const eventServiceOrderRouter = require('./event-service-order/event-service-order.routes');

const globalRouter = express.Router();

globalRouter.use('/areas', areaRouter);
globalRouter.use('/caterers', catererRouter);
globalRouter.use('/customers', customerRouter);
globalRouter.use('/foodItems', foodItemsRouter);
globalRouter.use('/menus', menusRouter);
globalRouter.use('/eventMenus', eventMenuRouter);
globalRouter.use('/dayMenus', dayMenuRouter);
globalRouter.use('/orders', orderRouter);
globalRouter.use('/eventServiceOrders', eventServiceOrderRouter);
globalRouter.use('/category', categoryRouter);
globalRouter.use('/payment', paymentRouter);

module.exports = globalRouter;
