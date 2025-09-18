const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// REGISTER
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array()[0].msg });

  const { name, email, password, userType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    const token = jwt.sign(
      { userId: newUser._id, userType: newUser.userType },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) throw new Error("Email does not exist");

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) throw new Error("Wrong credentials");

    if (userDoc.status === "banned") throw new Error("Account is banned");

    const token = jwt.sign(
      { userId: userDoc._id, userType: userDoc.userType },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        userType: userDoc.userType,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// CHECK CURRENT USER
exports.checkCurrentUser = async (req, res) => {
  try {
    if (!req.user) throw new Error("Unauthorized");

    const userDoc = await User.findById(req.user.userId).select("-password");
    if (!userDoc) throw new Error("User not found");

    res.status(200).json({
      message: "User is logged in",
      user: userDoc,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
