const express = require("express");
const loginController = require("../controllers/loginController");
const { validateBody } = require("../middleware/validateBody");
const { loginSchema } = require("../schemas/loginSchema");
const { isExistingEmail, isCorrectPassword } = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/", validateBody(loginSchema), isExistingEmail, isCorrectPassword, loginController.loginUser);

module.exports = router;