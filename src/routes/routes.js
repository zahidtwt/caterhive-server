const express = require('express');
const areaRouter = require('./area/area.routes');
const catererRouter = require('./caterer/caterer.routes');

const globalRouter = express.Router();

globalRouter.use('/areas', areaRouter);
globalRouter.use('/caterers', catererRouter);

module.exports = globalRouter;
