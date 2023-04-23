const express = require('express');
const {
  getAllCategories,
} = require('../../controllers/category/category.contoller');

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);

module.exports = categoryRouter;
