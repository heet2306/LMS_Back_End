// routes/categoryRoutes.js
const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// CREATE Category (only Admin)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("Admin"),
  addCategory
);

// READ ALL Categories (any authenticated user)
router.get("/", authenticateToken, getCategories);

///// single category
router.get("/:id", authenticateToken, getCategoryById);

// UPDATE Category (only Admin)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  updateCategory
);

// DELETE Category (only Admin)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  deleteCategory
);

module.exports = router;
