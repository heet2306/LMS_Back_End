const express = require("express");
const {
  borrowBook,
  returnBook,
  getTransactions,
} = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/borrow",
  authenticateToken,
  authorizeRoles("Admin", "Librarian"),
  borrowBook
);
router.post(
  "/return",
  authenticateToken,
  authorizeRoles("Admin", "Librarian"),
  returnBook
);
router.get("/:memberId", authenticateToken, getTransactions);

module.exports = router;

