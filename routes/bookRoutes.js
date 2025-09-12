const express = require("express");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin", "Librarian"),
  upload.single("coverImage"),
  addBook
);
router.get("/", authenticateToken, getBooks);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin", "Librarian"),
  upload.single("coverImage"),
  updateBook
);
router.delete("/:id", authenticateToken, authorizeRoles("Admin"), deleteBook);

module.exports = router;
