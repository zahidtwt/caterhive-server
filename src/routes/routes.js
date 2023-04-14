const express = require('express');
const areaRouter = require('./area/area.routes');
const catererRouter = require('./caterer/caterer.routes');
const customerRouter = require('./customer/customer.routes');
const foodItemsRouter = require('./food-item/food-item.routes');

const globalRouter = express.Router();

globalRouter.use('/areas', areaRouter);
globalRouter.use('/caterers', catererRouter);
globalRouter.use('/customers', customerRouter);
globalRouter.use('/foodItems', foodItemsRouter);

module.exports = globalRouter;
