const express = require("express");
const loginController = require("../controllers/loginController");
const { validateBody } = require("../middleware/validateBody");
const { loginSchema } = require("../schemas/loginSchema");
const { doesEmailExist, validatePassword } = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/", validateBody(loginSchema), doesEmailExist, validatePassword, loginController.loginUser);

module.exports = router;