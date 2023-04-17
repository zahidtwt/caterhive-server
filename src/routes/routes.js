const express = require('express');
const areaRouter = require('./area/area.routes');
const catererRouter = require('./caterer/caterer.routes');
const customerRouter = require('./customer/customer.routes');
const foodItemsRouter = require('./food-item/food-item.routes');
const menusRouter = require('./menu/menu.routes');
const dayMenuRouter = require('./day-menu/day-menu.routes');

const globalRouter = express.Router();

globalRouter.use('/areas', areaRouter);
globalRouter.use('/caterers', catererRouter);
globalRouter.use('/customers', customerRouter);
globalRouter.use('/foodItems', foodItemsRouter);
globalRouter.use('/menus', menusRouter);
globalRouter.use('/dayMenus', dayMenuRouter);

module.exports = globalRouter;
