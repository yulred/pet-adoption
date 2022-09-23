const express = require("express");
const signupController = require("../controllers/signupController");
const { validateBody } = require("../middleware/validateBody");
const { signupSchema } = require("../schemas/signupSchema");
const { doPasswordsMatch, isPasswordMinLength, doesUserExist, prepFields } = require("../middleware/signupMiddleware");
const { hashPassword } = require("../middleware/hashPassword");

const router = express.Router();

router.post("/", validateBody(signupSchema), doPasswordsMatch, isPasswordMinLength, doesUserExist, hashPassword, prepFields, signupController.signupUser);

module.exports = router;