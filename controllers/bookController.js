const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  const { title, author, category, isbn, stock } = req.body;
  const coverImage = req.file ? req.file.path : null;

  const book = await Book.create({
    title,
    author,
    category,
    isbn,
    stock,
    coverImage,
  });
  res.json({ message: "Book added", book });
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.updateBook = async (req, res) => {
  const updateData = req.body;
  if (req.file) updateData.coverImage = req.file.path;

  const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
