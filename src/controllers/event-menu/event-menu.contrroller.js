const eventMenus = require('../../models/event-menu/event-menu.model');
const validator = require('../../utils/validator');
const eventMenuValidatorSchema = require('./event-menu.validator');

const eventMenusPopulation = [
  { path: 'caterer' },
  { path: 'appetizers' },
  { path: 'mainCourses' },
  { path: 'desserts' },
  { path: 'drinks' },
];

async function getAllEventMenusByCaterer(req, res) {
  try {
    const { authUser, query } = req;

    const { searchBy = 'title', search = '' } = query;

    const allEventMenus = await eventMenus
      .find({
        caterer: { _id: authUser },
        [searchBy]: { $regex: search, $options: 'i' },
      })
      .populate(eventMenusPopulation);

    res.status(200).json(allEventMenus);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewEventMenu(req, res) {
  try {
    const { body } = req;

    const { error } = validator(eventMenuValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const newEventMenu = await eventMenus.create(body);

    await newEventMenu.populate(eventMenusPopulation);

    res.status(201).json(newEventMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllEventMenusByCaterer,
  createNewEventMenu,
};
