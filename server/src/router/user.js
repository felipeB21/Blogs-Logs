const { Router } = require("express");
const router = Router();

const userController = require("../controller/user");
const registerValidator = require("../validations/register");
const validateToken = require("../middlewares/validateToken");

router.post("/register", registerValidator, userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/profile", validateToken, userController.profile);

module.exports = router;
