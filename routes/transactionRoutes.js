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
  authorizeRoles("Member"),
  borrowBook
);
router.post(
  "/return",
  authenticateToken,
  authorizeRoles("Member"),
  returnBook
);
router.get("/", authenticateToken, getTransactions);

module.exports = router;

