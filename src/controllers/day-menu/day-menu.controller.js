const dayMenus = require('../../models/day-menu/day-menu.model');
const validator = require('../../utils/validator');
const dayMenuValidatorSchema = require('./day-menu.validator');

async function getAllDayMenusByCaterer(req, res) {
  try {
    const { authUser } = req;

    const allDayMenus = await dayMenus.find({ caterer: { _id: authUser } });

    return res.status(200).json(allDayMenus);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewDayMenu(req, res) {
  try {
    const { authUser, body } = req;

    if (!authUser) return res.status(404).json('User not found');

    const { error } = validator(dayMenuValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const dayMenu = await dayMenus.create({
      caterer: authUser,
      ...body,
    });

    return res.status(201).json(dayMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllDayMenusByCaterer,
  createNewDayMenu,
};
