const express = require("express");
const auth = require("../../middlewares/auth");
const {
  getAllDayMenusByCaterer,
  createNewDayMenu,
  deleteDayMenuById,
} = require("../../controllers/day-menu/day-menu.controller");

const dayMenuRouter = express.Router();

dayMenuRouter.get("/", auth, getAllDayMenusByCaterer);
dayMenuRouter.delete("/:id", auth, deleteDayMenuById);
dayMenuRouter.post("/", auth, createNewDayMenu);

module.exports = dayMenuRouter;
