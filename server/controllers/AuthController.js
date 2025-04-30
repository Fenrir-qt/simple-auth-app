const UserModel = require("../models/UserAccModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { password } = req.body;

  //Identifier is used to login the user using either their email or username
  const identifier = req.body.identifier || req.body.username || req.body.email;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ error: "Username/Email and Password are required" });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("auth_token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV, // default value for this is "development", use "production" for https://
        sameSite: "lax", 
        maxAge: 3600000, 
      })

      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: "lax",
  });
  res.json({ message: "Logout successful" });
};

module.exports = { loginUser, registerUser, logoutUser };
