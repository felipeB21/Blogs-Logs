const { body } = require("express-validator");

module.exports = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Description must be between 3 and 255 characters"),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Code must be between 3 and 255 characters"),
  body("tags").notEmpty().withMessage("Tags are required"),
];
