const categories = require('../../models/category/category.model');

async function getAllCategories(req, res) {
  try {
    const allCategories = await categories.find({});

    res.status(200).json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllCategories,
};
