const express = require("express");
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("Admin"), getAllUsers);
router.put("/role", authenticateToken, authorizeRoles("Admin"), updateUserRole);

module.exports = router;
