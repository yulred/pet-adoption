const express = require("express");
const loginController = require("../controllers/loginController");
const { validateBody } = require("../middleware/validateBody");
const { loginSchemaAjv } = require("../schemas/loginSchema");
const { isExistingEmail, isCorrectPassword } = require("../middleware/loginMiddleware");

const router = express.Router();

router.post("/", validateBody(loginSchemaAjv), isExistingEmail, isCorrectPassword, loginController.loginUser);

module.exports = router;