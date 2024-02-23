const { Router } = require("express");
const router = Router();

const codeController = require("../controller/code");
const validateToken = require("../middlewares/validateToken");
const codeValidator = require("../validations/code");

router.get("/code", codeController.getCode);
router.get("/code/:id", codeController.getCodeById);
router.post("/code", validateToken, codeValidator, codeController.createCode);
router.put(
  "/code/:id",
  validateToken,
  codeValidator,
  codeController.updateCode
);
router.delete("/code/:id", validateToken, codeController.deleteCode);

module.exports = router;
