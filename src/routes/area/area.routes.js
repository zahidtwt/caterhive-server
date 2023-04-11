const express = require('express');
const {
  getAllAreas,
  createNewArea,
  getAreaById,
} = require('../../controllers/area/area.controller');

const areaRouter = express.Router();

areaRouter.get('/', getAllAreas);
areaRouter.get('/:id', getAreaById);
areaRouter.post('/', createNewArea);

module.exports = areaRouter;
