const express = require('express');
const areaRouter = require('./area/area.routes');

const globalRouter = express.Router();

globalRouter.use('/area', areaRouter);

module.exports = globalRouter;
