const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMailer = require("../config/mailer");
const { sendPassword } = require("../config/mailFormat");

exports.register = async (req, res) => {
  const { name, email, password, role, memberType } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      memberType,
    });

    // send welcome email
    await sendMailer(
      email,
      "Welcome to LMS",
      sendPassword(name,email,password)
    );

    res.json({ message: "User registered and email sent", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token });
};
