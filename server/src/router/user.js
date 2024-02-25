const { Router } = require("express");
const router = Router();

const userController = require("../controller/user");
const registerValidator = require("../validations/register");
const validateToken = require("../middlewares/validateToken");

router.post("/register", registerValidator, userController.register);
router.post("/login", userController.login);
router.post("/logout", validateToken, userController.logout);
router.get("/verify", userController.verifyToken);
router.get("/profile/:id", userController.profile);
router.get("/users", userController.getUsers);

module.exports = router;
