const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;
  const validRoles = ["Admin", "Librarian", "Member"];
  if (!validRoles.includes(newRole))
    return res.status(400).json({ message: "Invalid role" });

  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true }
  );
  res.json({ message: "Role updated", user });
};
