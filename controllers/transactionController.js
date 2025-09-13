const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const calculateFine = require("../utils/fineCalculator");

exports.borrowBook = async (req, res) => {
  const { userId, bookId } = req.body;
  const book = await Book.findById(bookId);
  if (book.stock < 1)
    return res.status(400).json({ message: "Book not available" });

  book.stock -= 1;
  await book.save();

  const transaction = await Transaction.create({
    user: userId,
    book: bookId,
    borrowDate: new Date(),
  });

  res.json({ message: "Book borrowed", transaction });
};

exports.returnBook = async (req, res) => {
  const { transactionId } = req.body;
  const transaction = await Transaction.findById(transactionId).populate(
    "book"
  );
  transaction.returnDate = new Date();
  transaction.fine = calculateFine(
    transaction.borrowDate,
    transaction.returnDate
  );

  const book = await Book.findById(transaction.book._id);
  book.stock += 1;
  await book.save();
  await transaction.save();

  res.json({ message: "Book returned", fine: transaction.fine });
};

exports.getTransactions = async (req, res) => {
  // res.send(req.user)
  const transactions = await Transaction.find({ user: req.user.id }).populate(
    "book"
  );
  res.json(transactions);
};
