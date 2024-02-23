const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const createAccesToken = require("../libs/jwt");

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: { email: { msg: "Email already in use" } } });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const userCreated = await newUser.save();
      const token = await createAccesToken({ id: userCreated._id });
      res.cookie("token", token);
      res.json({
        message: "User registered successfully.",
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: { email: { msg: "Email not found" } } });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: { password: { msg: "Incorrect password" } } });
        }
      }

      const token = await createAccesToken({ id: user._id });
      res.cookie("token", token);
      res.json({
        message: "User logged in successfully.",
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: (req, res) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  },
  profile: async (req, res) => {
    try {
      const userById = await User.findById(req.user.id);
      if (!userById) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        id: userById._id,
        username: userById.username,
        email: userById.email,
        createdAt: userById.createdAt,
        updatedAt: userById.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};