const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    isbn: { type: String, unique: true },
    stock: { type: Number, default: 1 },
    coverImage: { type: String }, // for multer upload
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
