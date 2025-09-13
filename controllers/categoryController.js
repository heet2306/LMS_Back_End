// controllers/categoryController.js
const Category = require("../models/Category");

// CREATE
exports.addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const existData = await Category.findOne({ category_name })
    if (existData) {
      return res.json("category already exist")
    } else {
      const category = new Category({ category_name });
      await category.save();
      res.status(201).json("category added");
    }

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE (optional, not wired in routes yet)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { id } = req.params;
    await Category.findByIdAndUpdate(
      id,
      { category_name }
    )
    res.json("category updated")
  } catch (error) {
    console.log(error)
  }
}

// deleted
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const existData = await Category.findById(id)
    if (!existData) {
      return res.json("category not exist")
    }
    await Category.findByIdAndDelete(id)
    res.json("category deleted")
  } catch (error) {
    console.log(error)
  }
}
