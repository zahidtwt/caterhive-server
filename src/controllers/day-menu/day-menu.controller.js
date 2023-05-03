const dayMenus = require("../../models/day-menu/day-menu.model");
const validator = require("../../utils/validator");
const dayMenuValidatorSchema = require("./day-menu.validator");
const errorMessages = require("../../utils/errorMessages");

async function getAllDayMenusByCaterer(req, res) {
  try {
    const { authUser, query } = req;
    const { searchBy = "title", search = "" } = query;

    const allDayMenus = await dayMenus
      .find({
        caterer: { _id: authUser },
        [searchBy]: { $regex: search, $options: "i" },
      })
      .populate("menus caterer");

    return res.status(200).json(allDayMenus);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function deleteDayMenuById(req, res) {
  try {
    const { id } = req.params;
    const menus = await dayMenus.findByIdAndDelete(id);

    if (!menus) return res.status(404).json(errorMessages.notFound);

    return res.status(200).json(menus);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function createNewDayMenu(req, res) {
  try {
    const { authUser, body } = req;

    if (!authUser) return res.status(404).json("User not found");

    const { error } = validator(dayMenuValidatorSchema, body);

    if (error) return res.status(400).json(error.message);

    const dayMenu = await dayMenus.create({
      caterer: authUser,
      ...body,
    });

    await dayMenu.populate("menus");

    return res.status(201).json(dayMenu);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllDayMenusByCaterer,
  createNewDayMenu,
  deleteDayMenuById,
};
