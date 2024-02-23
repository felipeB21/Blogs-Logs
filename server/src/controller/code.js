const Code = require("../models/Code");
const { validationResult } = require("express-validator");

module.exports = {
  getCode: async (req, res) => {
    const codes = await Code.find().populate("user");
    if (!codes) return res.status(404).json({ message: "Codes not found" });
    res.json(codes);
  },
  getCodeById: async (req, res) => {
    const { id } = req.params;
    const code = await Code.findById(id);
    if (!code) return res.status(404).json({ message: "Code not found" });
    res.json(code);
  },
  createCode: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { title, description, code, tags } = req.body;
    const userId = req.user.id;
    const newCode = new Code({
      title,
      description,
      code,
      tags,
      user: userId,
    });
    const savedCode = await newCode.save();
    res.json(savedCode);
  },
  updateCode: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const code = await Code.findByIdAndUpdate(id, req.body, { new: true });
      if (!code) return res.status(404).json({ message: "Code not found" });

      if (code.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this code" });
      }
      res.json(code);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCode: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const code = await Code.findByIdAndDelete(id);
      if (!code) return res.status(404).json({ message: "Code not found" });

      if (code.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this code" });
      }

      return res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
