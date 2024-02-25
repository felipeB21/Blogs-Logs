const { body } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isString()
    .withMessage("Invalid username")
    .bail()
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("Username must not contain spaces");
      }
      return true;
    })
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
