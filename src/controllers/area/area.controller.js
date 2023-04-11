const areas = require('../../models/area/area.model');
const areaValidatorSchema = require('./area.validate');
const validator = require('../../utils/validator');
const setErrorMessage = require('../../utils/setErrorMessage');

async function getAllAreas(req, res) {
  try {
    const allAreas = await areas.find({});

    return res.status(200).json(allAreas);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewArea(req, res) {
  try {
    const { body } = req;

    const { error } = validator(areaValidatorSchema, body);

    if (error) return res.status(400).json(setErrorMessage(error.message));

    const exists = await areas.findOne({ name: body.name });

    if (exists)
      return res.status(400).json(setErrorMessage('Area already exists'));

    const newArea = await areas.create(body);

    return res.status(201).json(newArea);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllAreas,
  createNewArea,
};
