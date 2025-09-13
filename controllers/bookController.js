const Book = require("../models/Book");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");

// CREATE Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, isbn, stock } = req.body;
    const coverImage = req.file ? req.file.path : null;

    // ✅ Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const book = await Book.create({
      title,
      author,
      category, // category is an ObjectId reference
      isbn:Date.now(),
      stock,
      coverImage,
    });

    res.json({ message: "Book added", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Books
exports.getBooks = async (req, res) => {
  try {
    // ✅ Populate category info
    const books = await Book.find().populate("category", "category_name");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Book
exports.updateBook = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) updateData.coverImage = req.file.path;

    // ✅ Optional: validate category if updating it
    if (updateData.category) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("category", "category_name");

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.coverImage) {
      const imagePath = path.join(__dirname, `../${book.coverImage}`);
      fs.unlink(imagePath, async (err) => {
        if (err) console.log("Image delete error:", err);
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted" });
      });
    } else {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: "Book deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
