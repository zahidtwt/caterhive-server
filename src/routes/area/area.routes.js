const express = require('express');
const {
  getAllAreas,
  createNewArea,
} = require('../../controllers/area/area.controller');

const areaRouter = express.Router();

areaRouter.get('/', getAllAreas);
areaRouter.post('/', createNewArea);

module.exports = areaRouter;
