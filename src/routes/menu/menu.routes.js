const express = require("express");

const auth = require("../../middlewares/auth");
const {
  getMenusByCaterer,
  createNewMenu,
  getMenuById,
  reviewMenuById,
  addMenuToBookmark,
  deleteMenuById,
} = require("../../controllers/menu/menu.controller");

const menusRouter = express.Router();

menusRouter.get("/", auth, getMenusByCaterer);
menusRouter.get("/:id", getMenuById);
menusRouter.delete("/:id", deleteMenuById);
menusRouter.post("/", auth, createNewMenu);
menusRouter.post("/reviews/:id", auth, reviewMenuById);
menusRouter.put("/bookmark/:id", auth, addMenuToBookmark);

module.exports = menusRouter;
